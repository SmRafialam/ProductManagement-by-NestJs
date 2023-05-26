import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator"
import { Match } from "../decorator/match.decorator";

export class UserProfileDto {

    @ApiProperty()
    @IsString()
    @MinLength(2, {message: 'firstName must be greater than 1 characters'})
    @IsNotEmpty()
    firstName: string

    @ApiProperty()
    @IsString()
    @MinLength(2, {message: 'lastName must be greater than 1 characters'})
    @IsNotEmpty()
    lastName: string

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
    @Match(UserProfileDto, (s) => s.password)
    passwordConfirm: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    avatar: string
}