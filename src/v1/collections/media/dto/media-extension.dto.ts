import { ApiPropertyOptional } from "@nestjs/swagger"
import { ArrayMinSize, IsArray, IsOptional } from "class-validator"

export class MediaExtensionDto {

    @ApiPropertyOptional()
    @IsArray()
    // @ArrayMinSize(1)
    @IsOptional()
    image: string[]

    @ApiPropertyOptional()
    @IsArray()
    // @ArrayMinSize(1)
    @IsOptional()
    video: string[]

    @ApiPropertyOptional()
    @IsArray()
    // @ArrayMinSize(1)
    @IsOptional()
    document: string[]
}