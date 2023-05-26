import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class SnippetCreateDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    snippetId: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    category: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    text: string
}