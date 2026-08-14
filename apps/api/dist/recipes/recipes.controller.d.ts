import { CreateRecipeDto, RecipeListResponse, RecipeResponse, SearchRecipeDto, UpdateRecipeDto } from "@repo/shared";
import { RecipesService } from "./recipes.service";
export declare class RecipesController {
    private readonly recipesService;
    constructor(recipesService: RecipesService);
    findAll(query: SearchRecipeDto): Promise<RecipeListResponse>;
    findOne(id: string): Promise<RecipeResponse>;
    create(dto: CreateRecipeDto): Promise<RecipeResponse>;
    update(id: string, dto: UpdateRecipeDto): Promise<RecipeResponse>;
    remove(id: string): Promise<void>;
}
