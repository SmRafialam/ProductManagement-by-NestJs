import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateTestItemDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    description: string

    @ApiPropertyOptional()
    @IsNumber()
    @IsOptional()
    quantity: string

}
