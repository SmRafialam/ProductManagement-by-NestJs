import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from 'src/common/common.module';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CreateCategoryMiddleware } from './middleware';
import { categorySchema } from './schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Category', schema: categorySchema}]),
    CommonModule
  ],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer
      .apply(CreateCategoryMiddleware)
      .forRoutes({path: 'api/v1/collections/category', method: RequestMethod.POST})
  }
}
