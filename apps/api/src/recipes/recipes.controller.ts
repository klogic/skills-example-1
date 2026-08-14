import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import {
  CreateRecipeDto,
  RecipeListResponse,
  RecipeResponse,
  SearchRecipeDto,
  UpdateRecipeDto,
} from "@repo/shared";
import { RecipesService } from "./recipes.service";

@Controller("recipes")
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get()
  findAll(@Query() query: SearchRecipeDto): Promise<RecipeListResponse> {
    return this.recipesService.findAll(query);
  }

  @Get(":id")
  findOne(@Param("id") id: string): Promise<RecipeResponse> {
    return this.recipesService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateRecipeDto): Promise<RecipeResponse> {
    return this.recipesService.create(dto);
  }

  @Put(":id")
  update(
    @Param("id") id: string,
    @Body() dto: UpdateRecipeDto,
  ): Promise<RecipeResponse> {
    return this.recipesService.update(id, dto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param("id") id: string): Promise<void> {
    return this.recipesService.remove(id);
  }
}
