import { ApiPropertyOptional } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsBoolean, IsNotEmpty, IsNotEmptyObject, IsObject, IsOptional, IsString, ValidateNested } from "class-validator"
import { SegmentDto } from "./segment.dto"

export class ProductDto {

    @ApiPropertyOptional()
    @IsBoolean()
    @IsOptional()
    // @IsNotEmpty()
    view: boolean

    @ApiPropertyOptional()
    @IsBoolean()
    @IsOptional()
    // @IsNotEmpty()
    create: boolean

    @ApiPropertyOptional()
    @IsBoolean()
    @IsOptional()
    // @IsNotEmpty()
    manageCollaborators: boolean

    @ApiPropertyOptional()
    @IsBoolean()
    @IsOptional()
    // @IsNotEmpty()
    publishUnpublish: boolean

    @ApiPropertyOptional()
    @IsBoolean()
    @IsOptional()
    // @IsNotEmpty()
    archiveDelete: boolean

    @ApiPropertyOptional()
    @IsObject()
    @IsOptional()
    // @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => SegmentDto)
    segments: SegmentDto

}