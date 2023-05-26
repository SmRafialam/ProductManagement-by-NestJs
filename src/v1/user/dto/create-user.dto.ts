import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsArray, IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator"
import { Match } from "../decorator/match.decorator"

export class CreateUserDto {

    @ApiPropertyOptional()
    @IsString()
    @MinLength(2, {message: 'firstName must be greater than 1 characters'})
    @IsOptional()
    firstName: string

    @ApiPropertyOptional()
    @IsString()
    @MinLength(2, {message: 'lastName must be greater than 1 characters'})
    @IsOptional()
    lastName: string

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string

    @ApiPropertyOptional()
    @IsString()
    @MinLength(6, {message: 'password is too short & must be greater than 5 characters'})
    @IsOptional()
    @IsNotEmpty()
    password: string

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    @Match(CreateUserDto, (s) => s.password)
    passwordConfirm: string;

    @ApiProperty()
    @IsString({message: 'role id must be a string'})
    @IsNotEmpty()
    role: string

    @ApiPropertyOptional()
    @IsBoolean()
    @IsOptional()
    superAdmin: boolean

    @ApiPropertyOptional()
    @IsArray()
    @IsOptional()
    teams: [string]

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    // @IsNotEmpty()
    avatar: string
}