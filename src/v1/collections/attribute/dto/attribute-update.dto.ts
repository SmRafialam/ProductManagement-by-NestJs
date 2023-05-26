import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { ArrayMinSize, IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator"
import { ChoiceUpdateDto } from "../choice/dto"

export class AttributeUpdateDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiPropertyOptional()
    @IsArray()
    // @ArrayMinSize(1)
    @IsOptional()
    @ValidateNested()
    @Type(() => ChoiceUpdateDto)
    choices: ChoiceUpdateDto[]
}