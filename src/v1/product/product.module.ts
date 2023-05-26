import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from 'src/common/common.module';
import { reviewSchema } from '../collections/review/schema';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { productSchema } from './schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'Product', schema: productSchema},
      {name: 'Review', schema: reviewSchema}
    ]),
    CommonModule
  ],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
