import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateFeatureDto {
    @ApiProperty({example: "Test"})
    @IsString()
    @IsNotEmpty()
    title: string;
  
    @ApiPropertyOptional({example: ""})
    @IsString()
    image: string;
  
    @ApiPropertyOptional({example: ""})
    @IsString()
    icon: string;
  
    @ApiPropertyOptional({example: ""})
    @IsString()
    @IsOptional()
    description: string;

}
