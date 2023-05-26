import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/v1/auth/guard';
import { TagDto } from './dto';
import { TagService } from './tag.service';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth('API auth')
@ApiTags('tag')
@Controller()
export class TagController {
    constructor(private readonly tagService: TagService) {}

    @Get()
    getTagList() {
        return this.tagService.getTagList()
    }

    @Post()
    addTag(@Body() tagData: TagDto) {
        return this.tagService.addTag(tagData)
    }

    @Get(':id') 
    getTagById(@Param('id') tagId: string) {
        return this.tagService.getTagById(tagId)
    }

    @Patch(':id')
    updateTag(@Param('id') tagId: string, @Body() tagData: TagDto) {
        return this.tagService.updateTag(tagId, tagData)
    }

    @Delete(':id')
    deleteTag(@Param('id') tagId: string) {
        return this.tagService.deleteTag(tagId)
    }
}
