import { CategoryResponse, CreateCategoryDto, UpdateCategoryDto } from '@repo/shared';
import { CategoriesService } from './categories.service';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    findAll(): Promise<CategoryResponse[]>;
    findOne(id: string): Promise<CategoryResponse>;
    create(dto: CreateCategoryDto): Promise<CategoryResponse>;
    update(id: string, dto: UpdateCategoryDto): Promise<CategoryResponse>;
    remove(id: string): Promise<void>;
}
