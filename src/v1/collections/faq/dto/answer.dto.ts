import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { ArrayMinSize, IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class AnswerDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    answer: string

    @ApiPropertyOptional()
    @IsArray()
    // @ArrayMinSize(1)
    @IsOptional()
    products: string[]
}