import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class UserSettingsDto {

    @ApiProperty()
    @IsString({message: 'role id must be a string'})
    @IsNotEmpty()
    role: string

    @ApiPropertyOptional()
    @IsArray()
    @IsOptional()
    teams: [string]
}