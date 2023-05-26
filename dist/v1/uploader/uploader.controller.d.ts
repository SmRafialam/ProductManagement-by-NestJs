/// <reference types="multer" />
import { UploaderService } from './uploader.service';
export declare class UploaderController {
    private readonly uploaderService;
    constructor(uploaderService: UploaderService);
    uploadImageFile(files: Array<Express.Multer.File>, uploadTo: string): Promise<import("cloudinary").UploadApiResponse | import("cloudinary").UploadApiErrorResponse>;
}
