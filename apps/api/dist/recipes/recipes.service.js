"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const recipe_entity_1 = require("./recipe.entity");
const category_entity_1 = require("../categories/category.entity");
const ingredient_entity_1 = require("../ingredients/ingredient.entity");
let RecipesService = class RecipesService {
    constructor(recipeRepo, categoryRepo, ingredientRepo) {
        this.recipeRepo = recipeRepo;
        this.categoryRepo = categoryRepo;
        this.ingredientRepo = ingredientRepo;
    }
    async findAll(query) {
        const page = query.page ?? 1;
        const limit = query.limit ?? 20;
        const qb = this.recipeRepo
            .createQueryBuilder('recipe')
            .leftJoinAndSelect('recipe.ingredients', 'ingredient')
            .leftJoinAndSelect('recipe.category', 'category');
        if (query.query) {
            qb.andWhere('(LOWER(recipe.titleEn) LIKE :q OR recipe.titleTh LIKE :q)', { q: `%${query.query.toLowerCase()}%` });
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
    async findOne(id) {
        const recipe = await this.recipeRepo.findOne({
            where: { id },
            relations: ['ingredients', 'category'],
        });
        if (!recipe)
            throw new common_1.NotFoundException(`Recipe ${id} not found`);
        return this.toResponse(recipe);
    }
    async create(dto) {
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
    async update(id, dto) {
        const recipe = await this.recipeRepo.findOne({
            where: { id },
            relations: ['ingredients', 'category'],
        });
        if (!recipe)
            throw new common_1.NotFoundException(`Recipe ${id} not found`);
        if (dto.categoryId !== undefined) {
            recipe.category = dto.categoryId
                ? (await this.categoryRepo.findOne({ where: { id: dto.categoryId } }))
                : null;
        }
        if (dto.ingredients) {
            await this.ingredientRepo.delete({ recipe: { id } });
            recipe.ingredients = dto.ingredients.map((i) => this.ingredientRepo.create(i));
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
    async remove(id) {
        const recipe = await this.recipeRepo.findOne({ where: { id } });
        if (!recipe)
            throw new common_1.NotFoundException(`Recipe ${id} not found`);
        await this.recipeRepo.remove(recipe);
    }
    toResponse(recipe) {
        return {
            id: recipe.id,
            titleEn: recipe.titleEn,
            titleTh: recipe.titleTh,
            descriptionEn: recipe.descriptionEn,
            descriptionTh: recipe.descriptionTh,
            spiceLevel: recipe.spiceLevel,
            servings: recipe.servings,
            categoryId: recipe.category?.id ?? null,
            ingredients: (recipe.ingredients ?? []).map((i) => ({
                id: i.id,
                nameEn: i.nameEn,
                nameTh: i.nameTh,
                quantity: i.quantity,
                unit: i.unit,
            })),
            createdAt: recipe.createdAt.toISOString(),
            updatedAt: recipe.updatedAt.toISOString(),
        };
    }
};
exports.RecipesService = RecipesService;
exports.RecipesService = RecipesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(recipe_entity_1.Recipe)),
    __param(1, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __param(2, (0, typeorm_1.InjectRepository)(ingredient_entity_1.Ingredient)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], RecipesService);
//# sourceMappingURL=recipes.service.js.map