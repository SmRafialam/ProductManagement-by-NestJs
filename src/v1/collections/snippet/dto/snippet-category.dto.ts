import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class SnippetCategoryDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string
}