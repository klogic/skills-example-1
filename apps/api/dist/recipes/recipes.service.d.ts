import { Repository } from 'typeorm';
import { CreateRecipeDto, RecipeListResponse, RecipeResponse, SearchRecipeDto, UpdateRecipeDto } from '@repo/shared';
import { Recipe } from './recipe.entity';
import { Category } from '../categories/category.entity';
import { Ingredient } from '../ingredients/ingredient.entity';
export declare class RecipesService {
    private readonly recipeRepo;
    private readonly categoryRepo;
    private readonly ingredientRepo;
    constructor(recipeRepo: Repository<Recipe>, categoryRepo: Repository<Category>, ingredientRepo: Repository<Ingredient>);
    findAll(query: SearchRecipeDto): Promise<RecipeListResponse>;
    findOne(id: string): Promise<RecipeResponse>;
    create(dto: CreateRecipeDto): Promise<RecipeResponse>;
    update(id: string, dto: UpdateRecipeDto): Promise<RecipeResponse>;
    remove(id: string): Promise<void>;
    private toResponse;
}
