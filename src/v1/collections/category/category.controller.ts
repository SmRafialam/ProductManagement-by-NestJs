import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/v1/auth/guard';
import { CategoryService } from './category.service';
import { CategoryCreateDto, CategoryUpdateDto } from './dto';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth('API auth')
@ApiTags('category')
@Controller()
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get()
    getCategoryList() {
        return this.categoryService.getCategoryList()
    }

    @Post()
    addCategory(@Body() categoryCreateDto: CategoryCreateDto) {
        return this.categoryService.addCategory(categoryCreateDto, categoryCreateDto.parent)
    }

    @Get(':id')
    getCategoryById(@Param('id') teamId: string) {
        return this.categoryService.getCategoryById(teamId)
    }

    @Patch(':id')
    updateCategory(@Param('id') teamId: string, @Body() categoryUpdateDto: CategoryUpdateDto) {
        return this.categoryService.updateCategory(teamId, categoryUpdateDto)
    }

    @Delete(':id')
    deleteCategory(@Param('id') teamId: string) {
        return this.categoryService.deleteCategory(teamId)
    }
}
