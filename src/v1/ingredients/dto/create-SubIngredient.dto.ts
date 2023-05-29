import { IsNotEmpty, IsString } from "class-validator";

export class CreateSubIngredientDto {
    @IsString()
    @IsNotEmpty()
    title: string
}