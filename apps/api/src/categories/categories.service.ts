import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CategoryResponse,
  CreateCategoryDto,
  UpdateCategoryDto,
} from '@repo/shared';
import { Category } from './category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async findAll(): Promise<CategoryResponse[]> {
    const categories = await this.categoryRepo.find();
    return categories.map(this.toResponse);
  }

  async findOne(id: string): Promise<CategoryResponse> {
    const category = await this.categoryRepo.findOne({ where: { id } });
    if (!category) throw new NotFoundException(`Category ${id} not found`);
    return this.toResponse(category);
  }

  async create(dto: CreateCategoryDto): Promise<CategoryResponse> {
    const category = this.categoryRepo.create(dto);
    const saved = await this.categoryRepo.save(category);
    return this.toResponse(saved);
  }

  async update(id: string, dto: UpdateCategoryDto): Promise<CategoryResponse> {
    const category = await this.categoryRepo.findOne({ where: { id } });
    if (!category) throw new NotFoundException(`Category ${id} not found`);
    Object.assign(category, dto);
    const saved = await this.categoryRepo.save(category);
    return this.toResponse(saved);
  }

  async remove(id: string): Promise<void> {
    const category = await this.categoryRepo.findOne({ where: { id } });
    if (!category) throw new NotFoundException(`Category ${id} not found`);
    await this.categoryRepo.remove(category);
  }

  private toResponse(category: Category): CategoryResponse {
    return {
      id: category.id,
      nameEn: category.nameEn,
      nameTh: category.nameTh,
    };
  }
}
