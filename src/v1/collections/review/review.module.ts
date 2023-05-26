import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from 'src/common/common.module';
import { productSchema } from 'src/v1/product/schema';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { reviewSchema } from './schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'Review', schema: reviewSchema},
      {name: 'Product', schema: productSchema}
    ]),
    CommonModule
  ],
  controllers: [ReviewController],
  providers: [ReviewService]
})
export class ReviewModule {}
