import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/v1/auth/guard';
import { ChoiceService } from './choice.service';
import { ChoiceDto, ChoiceUpdateDto } from './dto';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth('API auth')
@ApiTags('choice')
@Controller()
export class ChoiceController {
    constructor(private readonly choiceService: ChoiceService) {}

    @Get()
    getChoiceList() {
        return this.choiceService.getChoiceList()
    }

    @Post()
    addChoice(@Body() choiceCreateDto: ChoiceDto) {
        return this.choiceService.addChoice(choiceCreateDto)
    }

    @Patch(':id')
    updateChoice(@Param('id') choiceId: string, @Body() choiceUpdateDto: ChoiceUpdateDto) {
        return this.choiceService.updateChoice(choiceId, choiceUpdateDto)
    }

    @Delete(':id')
    deleteChoice(@Param('id') choiceId: string) {
        return this.choiceService.deleteChoice(choiceId)
    }
}
