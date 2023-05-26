import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from 'src/common/common.module';
import { sellingChannelSchema } from './schema';
import { SellingChannelController } from './selling-channel.controller';
import { SellingChannelService } from './selling-channel.service';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Selling_Channel', schema: sellingChannelSchema}]),
    CommonModule
  ],
  controllers: [SellingChannelController],
  providers: [SellingChannelService]
})
export class SellingChannelModule {}
