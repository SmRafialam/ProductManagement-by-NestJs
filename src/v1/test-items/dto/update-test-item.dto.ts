import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateTestItemDto } from './create-test-item.dto';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTestItemDto extends PartialType(CreateTestItemDto) {
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
