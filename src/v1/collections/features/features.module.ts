import { Module } from '@nestjs/common';
import { FeaturesService } from './features.service';
import { FeaturesController } from './features.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { featureSchema } from './schema/features.schema';
import { CommonService } from 'src/common/common.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Feature', schema: featureSchema }])],
  controllers: [FeaturesController],
  providers: [FeaturesService,CommonService]
})
export class FeaturesModule {}
