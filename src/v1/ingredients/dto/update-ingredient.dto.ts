import { PartialType } from '@nestjs/swagger';
import { CreateIngredientDto, DailyValueDto } from './create-ingredient.dto';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateIngredientDto extends PartialType(CreateIngredientDto) {
  // @IsString()
  // @IsNotEmpty()
  // title: string;
  
  // dailyValue: DailyValueDto;

  // @IsString()
  // @IsOptional()
  // description: string;

  // @IsBoolean()
  // @IsOptional()
  // showDescription: boolean;

  // @IsString()
  // @IsOptional()
  // image: string;

  // @IsString()
  // @IsOptional()
  // icon: string;
}



