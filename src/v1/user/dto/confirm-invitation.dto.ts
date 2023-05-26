import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength } from "class-validator"
import { Match } from "../decorator";

export class ConfirmInvitationDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly firstName: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly lastName: string

    @ApiProperty()
    @IsString()
    @MinLength(6, {message: 'password is too short & must be greater than 5 characters'})
    @IsNotEmpty()
    password: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Match(ConfirmInvitationDto, (s) => s.password)
    passwordConfirm: string;
}
