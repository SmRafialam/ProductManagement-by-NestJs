import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from 'src/common/common.module';
import { AttributeController } from './attribute.controller';
import { AttributeService } from './attribute.service';
import { ChoiceModule } from './choice/choice.module';
import { choiceSchema } from './choice/schema';
import { DeleteAttributeMiddleware } from './middleware';
import { attributeSchema } from './schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'Attribute', schema: attributeSchema},
      {name: 'Choice', schema: choiceSchema}
    ]),
    ChoiceModule,
    CommonModule
  ],
  controllers: [AttributeController],
  providers: [AttributeService]
})
export class AttributeModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(DeleteAttributeMiddleware)
      .forRoutes({path: 'api/v1/collections/attribute/:id', method: RequestMethod.DELETE})
  }
}
