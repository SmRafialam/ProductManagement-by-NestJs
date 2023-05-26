import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/v1/auth/guard';
import { FaqCategoryDto, FaqCreateDto, FaqUpdateDto } from './dto';
import { FaqService } from './faq.service';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth('API auth')
@ApiTags('faq')
@Controller()
export class FaqController {
    constructor(private readonly faqService: FaqService) {}

    @Get()
    getfaqList() {
        return this.faqService.getFaqDetail()
    }

    @Get('category')
    getCategoryList() {
        return this.faqService.getCategoryList()
    }

    @Post('category')
    addFaqCategory(@Body() faqCatCreateDto: FaqCategoryDto) {
        return this.faqService.addFaqCategory(faqCatCreateDto)
    }

    @Patch('category/:id')
    editFaqCategory(@Param('id') faqCatId: string, @Body() faqCatUpdateDto: FaqCategoryDto) {
        return this.faqService.editFaqCategory(faqCatId, faqCatUpdateDto)
    }

    @Delete('category/:id')
    deleteFaqCategory(@Param('id') faqCatId: string) {
        return this.faqService.deleteFaqCategory(faqCatId)
    }

    @Get('question')
    getFaqList() {
        return this.faqService.getFaqList()
    }

    @Post('question')
    addFaq(@Body() faqCreateDto: FaqCreateDto) {
        return this.faqService.addFaq(faqCreateDto)
    }

    @Patch('question/:id')
    editFaq(@Param('id') questionId: string, @Body() faqUpdateDto: FaqUpdateDto) {
        return this.faqService.editFaq(questionId, faqUpdateDto)
    }

    @Delete('question/:id')
    deleteFaq(@Param('id') questionId: string) {
        return this.faqService.deleteFaq(questionId)
    }
    
}
