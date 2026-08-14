import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './category.entity';

const mockRepo = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
});

const baseCategory: Category = {
  id: 'cat-1',
  nameEn: 'Noodles',
  nameTh: 'เส้น',
  recipes: [],
};

describe('CategoriesService', () => {
  let service: CategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        { provide: getRepositoryToken(Category), useFactory: mockRepo },
      ],
    }).compile();

    service = module.get(CategoriesService);
  });

  it('findAll returns all categories', async () => {
    const repo = module_get_repo(service);
    repo.find.mockResolvedValue([baseCategory]);
    const result = await service.findAll();
    expect(result).toHaveLength(1);
    expect(result[0].nameEn).toBe('Noodles');
    expect(result[0].nameTh).toBe('เส้น');
  });

  it('findOne throws when not found', async () => {
    const repo = module_get_repo(service);
    repo.findOne.mockResolvedValue(null);
    await expect(service.findOne('nonexistent')).rejects.toThrow(NotFoundException);
  });
});

function module_get_repo(service: CategoriesService) {
  return (service as unknown as { categoryRepo: ReturnType<typeof mockRepo> }).categoryRepo;
}
