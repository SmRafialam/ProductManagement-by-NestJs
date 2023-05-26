import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from 'src/common/common.module';
import { FaqController } from './faq.controller';
import { FaqService } from './faq.service';
import { faqCategorySchema, faqSchema } from './schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'Faq_Category', schema: faqCategorySchema},
      {name: 'Faq', schema: faqSchema}
    ]),
    CommonModule
  ],
  controllers: [FaqController],
  providers: [FaqService]
})
export class FaqModule {}
