import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateRecipeDto,
  IngredientResponse,
  RecipeListResponse,
  RecipeResponse,
  SearchRecipeDto,
  UpdateRecipeDto,
} from '@repo/shared';
import { Recipe } from './recipe.entity';
import { Category } from '../categories/category.entity';
import { Ingredient } from '../ingredients/ingredient.entity';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepo: Repository<Recipe>,
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
    @InjectRepository(Ingredient)
    private readonly ingredientRepo: Repository<Ingredient>,
  ) {}

  async findAll(query: SearchRecipeDto): Promise<RecipeListResponse> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    const qb = this.recipeRepo
      .createQueryBuilder('recipe')
      .leftJoinAndSelect('recipe.ingredients', 'ingredient')
      .leftJoinAndSelect('recipe.category', 'category');

    if (query.query) {
      qb.andWhere(
        '(LOWER(recipe.titleEn) LIKE :q OR recipe.titleTh LIKE :q)',
        { q: `%${query.query.toLowerCase()}%` },
      );
    }

    if (query.spiceLevel) {
      qb.andWhere('recipe.spiceLevel = :spiceLevel', {
        spiceLevel: query.spiceLevel,
      });
    }

    if (query.categoryId) {
      qb.andWhere('category.id = :categoryId', {
        categoryId: query.categoryId,
      });
    }

    const [recipes, total] = await qb
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      items: recipes.map(this.toResponse),
      total,
      page,
      limit,
    };
  }

  async findOne(id: string): Promise<RecipeResponse> {
    const recipe = await this.recipeRepo.findOne({
      where: { id },
      relations: ['ingredients', 'category'],
    });
    if (!recipe) throw new NotFoundException(`Recipe ${id} not found`);
    return this.toResponse(recipe);
  }

  async create(dto: CreateRecipeDto): Promise<RecipeResponse> {
    const category = dto.categoryId
      ? await this.categoryRepo.findOne({ where: { id: dto.categoryId } })
      : null;

    const recipe = this.recipeRepo.create({
      titleEn: dto.titleEn,
      titleTh: dto.titleTh,
      descriptionEn: dto.descriptionEn,
      descriptionTh: dto.descriptionTh,
      spiceLevel: dto.spiceLevel,
      servings: dto.servings,
      category,
      ingredients: dto.ingredients.map((i) => this.ingredientRepo.create(i)),
    });

    const saved = await this.recipeRepo.save(recipe);
    return this.toResponse(saved);
  }

  async update(id: string, dto: UpdateRecipeDto): Promise<RecipeResponse> {
    const recipe = await this.recipeRepo.findOne({
      where: { id },
      relations: ['ingredients', 'category'],
    });
    if (!recipe) throw new NotFoundException(`Recipe ${id} not found`);

    if (dto.categoryId !== undefined) {
      recipe.category = dto.categoryId
        ? (await this.categoryRepo.findOne({ where: { id: dto.categoryId } }))
        : null;
    }

    if (dto.ingredients) {
      await this.ingredientRepo.delete({ recipe: { id } });
      recipe.ingredients = dto.ingredients.map((i) =>
        this.ingredientRepo.create(i),
      );
    }

    Object.assign(recipe, {
      ...(dto.titleEn !== undefined && { titleEn: dto.titleEn }),
      ...(dto.titleTh !== undefined && { titleTh: dto.titleTh }),
      ...(dto.descriptionEn !== undefined && { descriptionEn: dto.descriptionEn }),
      ...(dto.descriptionTh !== undefined && { descriptionTh: dto.descriptionTh }),
      ...(dto.spiceLevel !== undefined && { spiceLevel: dto.spiceLevel }),
      ...(dto.servings !== undefined && { servings: dto.servings }),
    });

    const saved = await this.recipeRepo.save(recipe);
    return this.toResponse(saved);
  }

  async remove(id: string): Promise<void> {
    const recipe = await this.recipeRepo.findOne({ where: { id } });
    if (!recipe) throw new NotFoundException(`Recipe ${id} not found`);
    await this.recipeRepo.remove(recipe);
  }

  private toResponse(recipe: Recipe): RecipeResponse {
    return {
      id: recipe.id,
      titleEn: recipe.titleEn,
      titleTh: recipe.titleTh,
      descriptionEn: recipe.descriptionEn,
      descriptionTh: recipe.descriptionTh,
      spiceLevel: recipe.spiceLevel,
      servings: recipe.servings,
      categoryId: recipe.category?.id ?? null,
      ingredients: (recipe.ingredients ?? []).map(
        (i): IngredientResponse => ({
          id: i.id,
          nameEn: i.nameEn,
          nameTh: i.nameTh,
          quantity: i.quantity,
          unit: i.unit,
        }),
      ),
      createdAt: recipe.createdAt.toISOString(),
      updatedAt: recipe.updatedAt.toISOString(),
    };
  }
}
