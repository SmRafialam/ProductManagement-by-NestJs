/// <reference types="multer" />
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
export declare class UploaderService {
    private readonly cloudinaryService;
    constructor(cloudinaryService: CloudinaryService);
    uploadImageFileToCloudinary(file: Express.Multer.File, folderName: string): Promise<UploadApiResponse | UploadApiErrorResponse>;
}
