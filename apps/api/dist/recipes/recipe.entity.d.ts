import { SpiceLevel } from '@repo/shared';
import { Category } from '../categories/category.entity';
import { Ingredient } from '../ingredients/ingredient.entity';
export declare class Recipe {
    id: string;
    titleEn: string;
    titleTh: string;
    descriptionEn: string;
    descriptionTh: string;
    spiceLevel: SpiceLevel;
    servings: number;
    category: Category | null;
    ingredients: Ingredient[];
    createdAt: Date;
    updatedAt: Date;
}
