import { Type } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsObject, IsOptional, IsString } from "class-validator";

export class DailyValueDto {
  @IsOptional()
  ingredientValue: number;
  
  @IsOptional()
  ingredientUnit: string;

  @IsOptional()
  hasDailyValue: boolean;
}

export class CreateIngredientDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  
  @IsOptional()
  dailyValue: DailyValueDto;

  @IsString()
  @IsOptional()
  description: string;

  @IsBoolean()
  @IsOptional()
  showDescription: boolean;

  @IsString()
  @IsOptional()
  image: string;

  @IsString()
  @IsOptional()
  icon: string;
}