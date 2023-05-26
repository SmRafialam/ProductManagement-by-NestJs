import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from 'src/common/common.module';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { mediaCategorySchema, mediaSchema } from './schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'Media_Category', schema: mediaCategorySchema},
      {name: 'Media', schema: mediaSchema}
    ]),
    CommonModule
  ],
  controllers: [MediaController],
  providers: [MediaService]
})
export class MediaModule {}
