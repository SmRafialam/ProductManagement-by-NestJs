import { ApiProperty } from "@nestjs/swagger";
import { MinLength, IsString, IsNotEmpty } from "class-validator";
import { Match } from "src/v1/user/decorator";

export class ManagePasswordDto {

    @ApiProperty()
    @IsString()
    @MinLength(6, {message: 'password is too short & must be greater than 5 characters'})
    @IsNotEmpty()
    password: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Match(ManagePasswordDto, (s) => s.password)
    passwordConfirm: string;
}