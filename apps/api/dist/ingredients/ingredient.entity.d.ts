import { IngredientUnit } from '@repo/shared';
import { Recipe } from '../recipes/recipe.entity';
export declare class Ingredient {
    id: string;
    nameEn: string;
    nameTh: string;
    quantity: number;
    unit: IngredientUnit;
    recipe: Recipe;
}
