import { ApiPropertyOptional } from "@nestjs/swagger"
import { IsEnum, IsNotEmpty, IsOptional } from "class-validator"
import { Availability } from "../enum"

export class SegmentDto {

    @ApiPropertyOptional()
    @IsEnum(Availability)
    @IsOptional()
    // @IsNotEmpty()
    generalSettings: Availability

    @ApiPropertyOptional()
    @IsEnum(Availability)
    @IsOptional()
    // @IsNotEmpty()
    productAttributes: Availability

    @ApiPropertyOptional()
    @IsEnum(Availability)
    @IsOptional()
    // @IsNotEmpty()
    pricing: Availability

    @ApiPropertyOptional()
    @IsEnum(Availability)
    @IsOptional()
    // @IsNotEmpty()
    delivery: Availability

    @ApiPropertyOptional()
    @IsEnum(Availability)
    @IsOptional()
    // @IsNotEmpty()
    sellingChannels: Availability

    @ApiPropertyOptional()
    @IsEnum(Availability)
    @IsOptional()
    // @IsNotEmpty()
    seo: Availability

    @ApiPropertyOptional()
    @IsEnum(Availability)
    @IsOptional()
    // @IsNotEmpty()
    media: Availability

    @ApiPropertyOptional()
    @IsEnum(Availability)
    @IsOptional()
    // @IsNotEmpty()
    content: Availability

    @ApiPropertyOptional()
    @IsEnum(Availability)
    @IsOptional()
    // @IsNotEmpty()
    formula: Availability

    @ApiPropertyOptional()
    @IsEnum(Availability)
    @IsOptional()
    // @IsNotEmpty()
    faq: Availability

    @ApiPropertyOptional()
    @IsEnum(Availability)
    @IsOptional()
    // @IsNotEmpty()
    reviews: Availability

    @ApiPropertyOptional()
    @IsEnum(Availability)
    @IsOptional()
    // @IsNotEmpty()
    translations: Availability

}