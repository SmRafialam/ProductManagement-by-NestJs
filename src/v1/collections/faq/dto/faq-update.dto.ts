import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { ArrayMinSize, IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator"
import { AnswerDto } from "./answer.dto"

export class FaqUpdateDto {

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
    // @ArrayMinSize(1)
    @ValidateNested()
    @Type(() => AnswerDto)
    @IsOptional()
    answers: AnswerDto[]
}