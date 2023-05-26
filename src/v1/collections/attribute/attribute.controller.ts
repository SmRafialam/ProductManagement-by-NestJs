import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/v1/auth/guard';
import { AttributeService } from './attribute.service';
import { AttributeDto, AttributeUpdateDto } from './dto';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth('API auth')
@ApiTags('attribute')
@Controller()
export class AttributeController {
    constructor(private readonly attributeService: AttributeService) {}

    @Get()
    getAttributeList() {
        return this.attributeService.getAttributeList()
    }

    @Post()
    addAttribute(@Body() attributeDto: AttributeDto) {
        return this.attributeService.addAttribute(attributeDto)
    }

    @Get(':id')
    getAttributeById(@Param('id') attrId: string) {
        return this.attributeService.getAttributeById(attrId)
    }

    @Patch(':id')
    updateAttribute(@Param('id') attrId: string, @Body() attributeUpdateDto: AttributeUpdateDto) {
        return this.attributeService.updateAttribute(attrId, attributeUpdateDto)
    }

    @Delete(':id')
    deleteAttribute(@Param('id') attrId: string) {
        return this.attributeService.deleteAttribute(attrId)
    }
}
