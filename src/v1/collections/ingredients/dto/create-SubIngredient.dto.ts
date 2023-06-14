import { Prop } from "@nestjs/mongoose";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateSubIngredientDto {
    @IsString()
    @IsNotEmpty()
    @Prop({ required: true, unique: true }) // Define unique index

    title: string
}