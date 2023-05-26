import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { AttributeModule } from './attribute/attribute.module';
import { FaqModule } from './faq/faq.module';
import { MediaModule } from './media/media.module';
import { PriceListModule } from './price-list/price-list.module';
import { ReviewModule } from './review/review.module';
import { SnippetModule } from './snippet/snippet.module';
import { TagModule } from './tag/tag.module';
import { SellingChannelModule } from './selling-channel/selling-channel.module';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [
    CategoryModule, 
    AttributeModule, 
    FaqModule, 
    MediaModule, 
    PriceListModule, 
    ReviewModule, 
    SnippetModule, 
    TagModule, 
    SellingChannelModule
  ]
})
export class CollectionsModule {}
