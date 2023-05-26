import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { UploaderController } from './uploader.controller';
import { UploaderService } from './uploader.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CloudinaryModule
  ],
  controllers: [UploaderController],
  providers: [UploaderService]
})
export class UploaderModule {}
