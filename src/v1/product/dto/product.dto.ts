import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ArrayMinSize, IsArray, IsNotEmpty, IsNotEmptyObject, IsObject, IsOptional, IsString } from "class-validator";

export class ProductDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    slug: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    sku: string

    @ApiPropertyOptional()
    @IsArray()
    // @ArrayMinSize(1)
    @IsOptional()
    category: string[]

    @ApiPropertyOptional()
    @IsArray()
    // @ArrayMinSize(1)
    @IsOptional()
    tag: string[]

    @ApiPropertyOptional()
    @IsObject()
    @IsNotEmptyObject()
    @IsOptional()
    image: object

    @ApiPropertyOptional()
    @IsArray()
    // @ArrayMinSize(1)
    @IsOptional()
    users: string[]

    @ApiPropertyOptional()
    @IsArray()
    // @ArrayMinSize(1)
    @IsOptional()
    teams: string[]
}