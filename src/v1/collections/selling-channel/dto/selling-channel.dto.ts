import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNotEmpty, IsNotEmptyObject, IsObject, IsString, ValidateNested } from "class-validator";
import { DestinationDto } from "./destination.dto";

export class SellingChannelDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty()
    @IsObject()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => DestinationDto)
    destination: DestinationDto

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    country: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    priceList: string

    @ApiProperty()
    @IsArray()
    @ArrayMinSize(1)
    screens: string[]
}