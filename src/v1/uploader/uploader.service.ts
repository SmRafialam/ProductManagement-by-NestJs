import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class UploaderService {
    constructor(private readonly cloudinaryService: CloudinaryService) {}

    async uploadImageFileToCloudinary(file: Express.Multer.File, folderName: string): Promise<UploadApiResponse | UploadApiErrorResponse> {
        const data = await this.cloudinaryService.uploadImage(file, folderName)
        return data
    }
}
