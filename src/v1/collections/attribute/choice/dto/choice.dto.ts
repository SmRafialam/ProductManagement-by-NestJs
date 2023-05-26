import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class ChoiceDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiPropertyOptional()
    @IsString()
    // @IsNotEmpty()
    @IsOptional()
    suffix: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    attribute: string
}