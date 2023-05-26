import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/v1/auth/guard';
import { SellingChannelDto } from './dto';
import { SellingChannelService } from './selling-channel.service';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth('API auth')
@ApiTags('selling-channel')
@Controller()
export class SellingChannelController {
    constructor(private readonly sellingChannelService: SellingChannelService) {}

    @Get()
    getSellingChannelList() {
        return this.sellingChannelService.getSellingChannelList()
    }

    @Post()
    addSellingChannel(@Body() sellingChannelCreateDto: SellingChannelDto) {
        return this.sellingChannelService.addSellingChannel(sellingChannelCreateDto)
    }

    @Get(':id')
    getSellingChannelById(@Param('id') channelId: string) {
        return this.sellingChannelService.getSellingChannelById(channelId)
    }

    @Patch(':id')
    updateSellingChannel(@Param('id') channelId: string, @Body() sellingChannelUpdateDto: SellingChannelDto) {
        return this.sellingChannelService.updateSellingChannel(channelId, sellingChannelUpdateDto)
    }

    @Delete(':id')
    deleteSellingChannel(@Param('id') channelId: string) {
        return this.sellingChannelService.deleteSellingChannel(channelId)
    }
}
