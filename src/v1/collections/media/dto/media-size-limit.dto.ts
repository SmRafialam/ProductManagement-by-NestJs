import { ApiPropertyOptional } from "@nestjs/swagger"
import { IsNotEmptyObject, IsObject, IsOptional } from "class-validator"

export class MediaSizeLimitDto {

    @ApiPropertyOptional()
    @IsObject()
    // @IsNotEmptyObject()
    @IsOptional()
    image: object

    @ApiPropertyOptional()
    @IsObject()
    // @IsNotEmptyObject()
    @IsOptional()
    video: object

    @ApiPropertyOptional()
    @IsObject()
    // @IsNotEmptyObject()
    @IsOptional()
    document: object
}