import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from 'src/common/common.module';
import { tagSchema } from './schema';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Tag', schema: tagSchema}]),
    CommonModule
  ],
  controllers: [TagController],
  providers: [TagService]
})
export class TagModule {}
