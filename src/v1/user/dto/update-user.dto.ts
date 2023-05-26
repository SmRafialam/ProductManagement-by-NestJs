import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator"
import { Match } from "../decorator/match.decorator";

export class UpdateUserDto {

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

    @ApiPropertyOptional()
    @IsString()
    @MinLength(8, {message: 'password is too short & must be greater than 7 characters'})
    @IsOptional()
    @IsNotEmpty()
    password: string

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    @Match(UpdateUserDto, (s) => s.password)
    passwordConfirm: string;

    @ApiPropertyOptional()
    @IsString({message: 'role id must be a string'})
    @IsOptional()
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