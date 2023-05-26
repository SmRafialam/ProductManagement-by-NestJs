import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class AttributeDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string
}