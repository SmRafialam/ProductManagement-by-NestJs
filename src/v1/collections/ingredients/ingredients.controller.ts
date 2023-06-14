import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Ingredients } from './interface/ingredient.interface';
import { JwtAuthGuard } from 'src/v1/auth/guard';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth('API auth')
@ApiTags('ingredients')
@Controller()
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Post()
  create(@Body() createIngredientDto: CreateIngredientDto) {
    return this.ingredientsService.createIngredient(createIngredientDto);
  }

  @Post('bulk')
  createBulkIngredients(@Body() ingredientData: { title: string; subIngredients: { title: string; subIngredients: any[] }[] }[]): Promise<{ isSuccess: boolean; result: Ingredients[] }> {
    return this.ingredientsService.createBulkIngredients(ingredientData);
  }
  

  @Get()
  findAll() {
    return this.ingredientsService.getIngredientList();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ingredientsService.getIngredientById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIngredientDto: UpdateIngredientDto) {
    return this.ingredientsService.updateIngredient(id, updateIngredientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ingredientsService.deleteIngredient(id);
  }
}
