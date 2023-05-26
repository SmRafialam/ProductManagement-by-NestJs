import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/v1/auth/guard';
import { SnippetCategoryDto, SnippetCreateDto, SnippetUpdateDto } from './dto';
import { SnippetService } from './snippet.service';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth('API auth')
@ApiTags('text-snippet')
@Controller()
export class SnippetController {
    constructor(private readonly snippetService: SnippetService) {}

    @Get('category')
    getCategoryList() {
        return this.snippetService.getCategoryList()
    }

    @Post('category')
    addCategory(@Body() catDto: SnippetCategoryDto) {
        return this.snippetService.addCategory(catDto)
    }

    @Patch('category/:id')
    updateCategory(@Param('id') catId: string, @Body() catDto: SnippetCategoryDto) {
        return this.snippetService.updateCategory(catId, catDto)
    }

    @Delete('category/:id')
    deleteCategory(@Param('id') catId: string) {
        return this.snippetService.deleteCategory(catId)
    }

    @Get('text')
    getSnippetList() {
        return this.snippetService.getSnippetList()
    }

    @Post('text')
    addSnippet(@Body() snippetCreateDto: SnippetCreateDto) {
        return this.snippetService.addSnippet(snippetCreateDto)
    }

    @Patch('text/:id')
    updateSnippet(@Param('id') snippetId: string, @Body() snippetUpdateDto: SnippetUpdateDto) {
        return this.snippetService.updateSnippet(snippetId, snippetUpdateDto)
    }

    @Delete('text/:id')
    deleteSnippet(@Param('id') snippetId: string) {
        return this.snippetService.deleteSnippet(snippetId)
    }

}
