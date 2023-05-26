import { ApiPropertyOptional } from "@nestjs/swagger"
import { IsEnum, IsNotEmpty, IsOptional } from "class-validator"
import { Availability } from "../enum"

export class CollectionDto {

    @ApiPropertyOptional()
    @IsEnum(Availability)
    @IsOptional()
    // @IsNotEmpty()
    categories: Availability

    @ApiPropertyOptional()
    @IsEnum(Availability)
    @IsOptional()
    // @IsNotEmpty()
    attributes: Availability

    @ApiPropertyOptional()
    @IsEnum(Availability)
    @IsOptional()
    // @IsNotEmpty()
    mediaCategories: Availability

    @ApiPropertyOptional()
    @IsEnum(Availability)
    @IsOptional()
    // @IsNotEmpty()
    formula: Availability

    @ApiPropertyOptional()
    @IsEnum(Availability)
    @IsOptional()
    // @IsNotEmpty()
    tags: Availability

    @ApiPropertyOptional()
    @IsEnum(Availability)
    @IsOptional()
    // @IsNotEmpty()
    metadata: Availability

    @ApiPropertyOptional()
    @IsEnum(Availability)
    @IsOptional()
    // @IsNotEmpty()
    textSnippets: Availability

    @ApiPropertyOptional()
    @IsEnum(Availability)
    @IsOptional()
    // @IsNotEmpty()
    sellingChannels: Availability

    @ApiPropertyOptional()
    @IsEnum(Availability)
    @IsOptional()
    // @IsNotEmpty()
    taxesFees: Availability

    @ApiPropertyOptional()
    @IsEnum(Availability)
    @IsOptional()
    // @IsNotEmpty()
    teams: Availability

    @ApiPropertyOptional()
    @IsEnum(Availability)
    @IsOptional()
    // @IsNotEmpty()
    reviews: Availability

    @ApiPropertyOptional()
    @IsEnum(Availability)
    @IsOptional()
    // @IsNotEmpty()
    faq: Availability

}