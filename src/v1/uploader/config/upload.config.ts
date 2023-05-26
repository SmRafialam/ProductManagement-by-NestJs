import { HttpException, HttpStatus } from "@nestjs/common";
import { memoryStorage } from "multer";
import { extname } from "path";

export const uploadOptions = {
    storage: memoryStorage(),
    limits: {
        fileSize: +process.env.MAX_FILE_SIZE,
    },
    fileFilter: (req: any, file: any, cb: any) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
            cb(null, true);
        } else {
            cb(new HttpException(`Unsupported file type ${extname(file.originalname)}`, HttpStatus.BAD_REQUEST), false);
        }
    }
}