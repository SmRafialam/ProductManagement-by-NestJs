import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsNotEmpty, IsNotEmptyObject, IsObject, IsOptional, IsString, ValidateNested } from "class-validator"
import { MediaExtensionDto } from "./media-extension.dto"
import { MediaQuantityDto } from "./media-quantity.dto"
import { MediaSizeLimitDto } from "./media-size-limit.dto"

export class MediaUpdateDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiPropertyOptional()
    @IsString()
    // @IsNotEmpty()
    @IsOptional()
    description: string

    @ApiPropertyOptional()
    @IsObject()
    // @IsNotEmptyObject()
    @IsOptional()
    @ValidateNested()
    @Type(() => MediaExtensionDto)
    extensions: MediaExtensionDto

    @ApiPropertyOptional()
    @IsObject()
    // @IsNotEmptyObject()
    @IsOptional()
    @ValidateNested()
    @Type(() => MediaSizeLimitDto)
    sizeLimit: MediaSizeLimitDto

    @ApiPropertyOptional()
    @IsObject()
    // @IsNotEmptyObject()
    @IsOptional()
    @ValidateNested()
    @Type(() => MediaQuantityDto)
    quantity: MediaQuantityDto
}