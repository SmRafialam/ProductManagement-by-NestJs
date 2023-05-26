import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsBoolean, IsNotEmpty, IsNotEmptyObject, IsObject, IsOptional, IsString, ValidateNested } from "class-validator"
import { CollectionDto } from "./collection.dto"
import { ProductDto } from "./product.dto"

export class CreateRoleDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiPropertyOptional()
    @IsBoolean()
    @IsOptional()
    // @IsNotEmpty()
    systemAdmin: boolean

    @ApiPropertyOptional()
    @IsBoolean()
    @IsOptional()
    // @IsNotEmpty()
    dashboard: string

    @ApiPropertyOptional()
    @IsObject()
    @IsOptional()
    // @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => ProductDto)
    products: ProductDto

    @ApiPropertyOptional()
    @IsObject()
    @IsOptional()
    // @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => CollectionDto)
    collections: CollectionDto;

    @ApiPropertyOptional()
    @IsBoolean()
    @IsOptional()
    // @IsNotEmpty()
    priceList: boolean
}