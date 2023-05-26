import { ApiPropertyOptional } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class MediaQuantityDto {

    @ApiPropertyOptional()
    @IsNumber()
    // @IsNotEmpty()
    @IsOptional()
    max: number

    @ApiPropertyOptional()
    @IsNumber()
    // @IsNotEmpty()
    @IsOptional()
    min: number
}