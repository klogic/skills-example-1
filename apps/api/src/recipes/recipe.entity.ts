import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SpiceLevel } from '@repo/shared';
import { Category } from '../categories/category.entity';
import { Ingredient } from '../ingredients/ingredient.entity';

@Entity('recipes')
export class Recipe {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  titleEn: string;

  @Column()
  titleTh: string;

  @Column('text')
  descriptionEn: string;

  @Column('text')
  descriptionTh: string;

  @Column({ type: 'varchar' })
  spiceLevel: SpiceLevel;

  @Column('int')
  servings: number;

  @ManyToOne(() => Category, (category) => category.recipes, {
    nullable: true,
    eager: false,
  })
  category: Category | null;

  @OneToMany(() => Ingredient, (ingredient) => ingredient.recipe, {
    cascade: true,
    eager: true,
  })
  ingredients: Ingredient[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
