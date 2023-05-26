import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from 'src/common/common.module';
import { attributeSchema } from '../schema';
import { ChoiceController } from './choice.controller';
import { ChoiceService } from './choice.service';
import { choiceSchema } from './schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'Attribute', schema: attributeSchema},
      {name: 'Choice', schema: choiceSchema}
    ]),
    CommonModule
  ],
  controllers: [ChoiceController],
  providers: [ChoiceService],
})
export class ChoiceModule {}
