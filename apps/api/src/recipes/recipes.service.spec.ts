import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SpiceLevel, IngredientUnit } from '@repo/shared';
import { RecipesService } from './recipes.service';
import { Recipe } from './recipe.entity';
import { Category } from '../categories/category.entity';
import { Ingredient } from '../ingredients/ingredient.entity';

const mockRecipeRepo = () => ({
  createQueryBuilder: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
});

const mockCategoryRepo = () => ({ findOne: jest.fn() });
const mockIngredientRepo = () => ({ create: jest.fn(), delete: jest.fn() });

const baseRecipe: Recipe = {
  id: 'recipe-1',
  titleEn: 'Pad Thai',
  titleTh: 'ผัดไทย',
  descriptionEn: 'Classic stir-fried noodles.',
  descriptionTh: 'เส้นผัดคลาสสิก',
  spiceLevel: SpiceLevel.MEDIUM,
  servings: 2,
  category: null,
  ingredients: [
    {
      id: 'ing-1',
      nameEn: 'Rice noodles',
      nameTh: 'เส้นก๋วยเตี๋ยว',
      quantity: 200,
      unit: IngredientUnit.GRAMS,
      recipe: {} as Recipe,
    },
  ],
  createdAt: new Date('2026-01-01'),
  updatedAt: new Date('2026-01-01'),
};

describe('RecipesService', () => {
  let service: RecipesService;
  let recipeRepo: jest.Mocked<Repository<Recipe>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecipesService,
        { provide: getRepositoryToken(Recipe), useFactory: mockRecipeRepo },
        { provide: getRepositoryToken(Category), useFactory: mockCategoryRepo },
        { provide: getRepositoryToken(Ingredient), useFactory: mockIngredientRepo },
      ],
    }).compile();

    service = module.get(RecipesService);
    recipeRepo = module.get(getRepositoryToken(Recipe));
  });

  describe('findOne', () => {
    it('returns a recipe response when found', async () => {
      recipeRepo.findOne.mockResolvedValue(baseRecipe);
      const result = await service.findOne('recipe-1');
      expect(result.titleEn).toBe('Pad Thai');
      expect(result.titleTh).toBe('ผัดไทย');
    });

    it('throws NotFoundException when recipe does not exist', async () => {
      recipeRepo.findOne.mockResolvedValue(null);
      await expect(service.findOne('nonexistent')).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('supports Thai text search and returns paginated results', async () => {
      const qb = {
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        getManyAndCount: jest.fn().mockResolvedValue([[baseRecipe], 1]),
      };
      recipeRepo.createQueryBuilder.mockReturnValue(qb as never);

      const result = await service.findAll({ query: 'ผัดไทย', page: 1, limit: 10 });
      expect(result.total).toBe(1);
      expect(result.items[0].titleTh).toBe('ผัดไทย');
      expect(qb.andWhere).toHaveBeenCalledWith(
        expect.stringContaining('titleTh'),
        expect.objectContaining({ q: '%ผัดไทย%' }),
      );
    });

    it('returns empty list when no recipes match', async () => {
      const qb = {
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        getManyAndCount: jest.fn().mockResolvedValue([[], 0]),
      };
      recipeRepo.createQueryBuilder.mockReturnValue(qb as never);
      const result = await service.findAll({ query: 'nonexistent' });
      expect(result.items).toHaveLength(0);
      expect(result.total).toBe(0);
    });
  });

  describe('remove', () => {
    it('removes a recipe when it exists', async () => {
      recipeRepo.findOne.mockResolvedValue(baseRecipe);
      recipeRepo.remove.mockResolvedValue(baseRecipe);
      await expect(service.remove('recipe-1')).resolves.toBeUndefined();
    });

    it('throws NotFoundException when recipe to remove does not exist', async () => {
      recipeRepo.findOne.mockResolvedValue(null);
      await expect(service.remove('nonexistent')).rejects.toThrow(NotFoundException);
    });
  });
});
