import { Repository } from 'typeorm';
import { CategoryResponse, CreateCategoryDto, UpdateCategoryDto } from '@repo/shared';
import { Category } from './category.entity';
export declare class CategoriesService {
    private readonly categoryRepo;
    constructor(categoryRepo: Repository<Category>);
    findAll(): Promise<CategoryResponse[]>;
    findOne(id: string): Promise<CategoryResponse>;
    create(dto: CreateCategoryDto): Promise<CategoryResponse>;
    update(id: string, dto: UpdateCategoryDto): Promise<CategoryResponse>;
    remove(id: string): Promise<void>;
    private toResponse;
}
