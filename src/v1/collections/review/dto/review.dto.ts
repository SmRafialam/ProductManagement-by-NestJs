import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ArrayMinSize, IsArray, IsNotEmpty, IsNotEmptyObject, IsNumber, IsObject, IsOptional, IsString } from "class-validator";

export class ReviewDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiPropertyOptional()
    @IsString()
    // @IsNotEmpty()
    @IsOptional()
    occupation: string

    @ApiPropertyOptional()
    @IsObject()
    // @IsNotEmptyObject()
    @IsOptional()
    avatar: object

    @ApiPropertyOptional()
    @IsString()
    // @IsNotEmpty()
    @IsOptional()
    location: string

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    rating: number

    @ApiPropertyOptional()
    @IsString()
    // @IsNotEmpty()
    @IsOptional()
    shortReview: string

    @ApiPropertyOptional()
    @IsString()
    // @IsNotEmpty()
    @IsOptional()
    longReview:string

    @ApiPropertyOptional()
    @IsArray()
    // @ArrayMinSize(1)
    @IsOptional()
    images: object[]

    @ApiPropertyOptional()
    @IsArray()
    // @ArrayMinSize(1)
    @IsOptional()
    products: string[]
}