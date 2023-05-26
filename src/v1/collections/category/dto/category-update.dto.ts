import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { ArrayMinSize, IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator"

export class CategoryUpdateDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiPropertyOptional()
    @IsString()
    // @IsNotEmpty()
    @IsOptional()
    shortText: string

    @ApiPropertyOptional()
    @IsString()
    // @IsNotEmpty()
    @IsOptional()
    longText: string

    @ApiPropertyOptional()
    @IsArray()
    // @ArrayMinSize(1)
    @IsOptional()
    media: object[]
}