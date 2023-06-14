import { Type } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { CreateSubIngredientDto } from "./create-SubIngredient.dto";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Prop } from "@nestjs/mongoose";

export class DailyValueDto {
  @IsOptional()
  ingredientValue: number;
  
  @IsOptional()
  ingredientUnit: string;

  @IsOptional()
  hasDailyValue: boolean;
}

export class CreateIngredientDto {
  @ApiProperty({example: "Test"})
  @IsString()
  @IsNotEmpty()
  title: string;
  
  @ApiPropertyOptional({example: {
    "setDailyValue": true,
    "dailyValueAmount": 0,
    "dailyValueUnit": "g",
    "dailyValueEstablished": false
  }})
  @IsOptional()
  dailyValue: DailyValueDto;

  @ApiPropertyOptional({example: ""})
  @IsString()
  @IsOptional()
  description: string;

  @ApiPropertyOptional({example: false})
  @IsBoolean()
  @IsOptional()
  showDescription: boolean;

  @ApiPropertyOptional({example: ""})
  @IsString()
  @IsOptional()
  image: string;

  @ApiPropertyOptional({example: ""})
  @IsString()
  @IsOptional()
  icon: string;

  @ApiProperty({example: [
    {
    "title": "Sub Ingredient 1"
    },
    {
    "title": "Sub Ingredient 2"
    }
  ]})
  @IsOptional()
  @Prop({ required: true, unique: true }) // Define unique index
  @ValidateNested()
  @Type(() => CreateSubIngredientDto)
  subIngredients: CreateSubIngredientDto[];
}


