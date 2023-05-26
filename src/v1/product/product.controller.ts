import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard';
import { ProductDto } from './dto';
import { ProductService } from './product.service';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth('API auth')
@ApiTags('product')
@Controller()
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    getProductList() {
        return this.productService.getProductList()
    }

    @Post()
    addProduct(@Body() productCreateDto: ProductDto) {
        return this.productService.addProduct(productCreateDto)
    }

    @Get(':id')
    getProductById(@Param('id') productId: string) {
        return this.productService.getProductById(productId)
    }

    @Patch(':id')
    updateProduct(@Param('id') productId: string, @Body() productUpdateDto: ProductDto) {
        return this.productService.updateProduct(productId, productUpdateDto)
    }

    @Delete(':id')
    deleteProduct(@Param('id') productId: string) {
        return this.productService.deleteProduct(productId)
    }
}
