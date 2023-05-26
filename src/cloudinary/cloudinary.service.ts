import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 as clodinary } from 'cloudinary';
import { createReadStream } from 'streamifier';

@Injectable()
export class CloudinaryService {
    uploadImage(file: Express.Multer.File, folderName: string): Promise<UploadApiResponse | UploadApiErrorResponse> {
        return new Promise((resolve, reject) => {
            const upload = clodinary.uploader.upload_stream({folder: `pim/${folderName}`}, (error, result) => {
                if (error) return reject(error);
                resolve(result);
            });
            createReadStream(file.buffer).pipe(upload);
        });
    }
}
