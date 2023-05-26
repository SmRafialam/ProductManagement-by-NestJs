import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { ArrayMinSize, IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator"
import { AnswerDto } from "./answer.dto"

export class FaqCreateDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    question: string

    @ApiPropertyOptional()
    @IsString()
    // @IsNotEmpty()
    @IsOptional()
    note: string

    @ApiPropertyOptional()
    @IsArray()
    @ValidateNested()
    @Type(() => AnswerDto)
    @IsOptional()
    answers: AnswerDto[]

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    category: string
}