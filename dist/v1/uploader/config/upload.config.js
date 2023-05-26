"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadOptions = void 0;
const common_1 = require("@nestjs/common");
const multer_1 = require("multer");
const path_1 = require("path");
exports.uploadOptions = {
    storage: (0, multer_1.memoryStorage)(),
    limits: {
        fileSize: +process.env.MAX_FILE_SIZE,
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
            cb(null, true);
        }
        else {
            cb(new common_1.HttpException(`Unsupported file type ${(0, path_1.extname)(file.originalname)}`, common_1.HttpStatus.BAD_REQUEST), false);
        }
    }
};
//# sourceMappingURL=upload.config.js.map