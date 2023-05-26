import { Controller, Post, Query, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard';
import { uploadOptions } from './config';
import { UploaderService } from './uploader.service';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth('API auth')
@ApiTags('uploader')
@Controller()
export class UploaderController {
    constructor(private readonly uploaderService: UploaderService) {}

    @Post('image')
    @ApiQuery({name: 'uploadTo', required: false})
    @UseInterceptors(AnyFilesInterceptor(uploadOptions))
    uploadImageFile(@UploadedFiles() files: Array<Express.Multer.File>, @Query('uploadTo') uploadTo: string) {
        const folderName = uploadTo && uploadTo !== '' ? uploadTo : 'default'
        return this.uploaderService.uploadImageFileToCloudinary(files[0], folderName)
    }
}
