/// <reference types="multer" />
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
export declare class CloudinaryService {
    uploadImage(file: Express.Multer.File, folderName: string): Promise<UploadApiResponse | UploadApiErrorResponse>;
}
