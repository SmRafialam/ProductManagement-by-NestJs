import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty } from "class-validator"

export class ResetDto {

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string
}