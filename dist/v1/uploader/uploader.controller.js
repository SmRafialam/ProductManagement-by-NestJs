"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploaderController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const guard_1 = require("../auth/guard");
const config_1 = require("./config");
const uploader_service_1 = require("./uploader.service");
let UploaderController = class UploaderController {
    constructor(uploaderService) {
        this.uploaderService = uploaderService;
    }
    uploadImageFile(files, uploadTo) {
        const folderName = uploadTo && uploadTo !== '' ? uploadTo : 'default';
        return this.uploaderService.uploadImageFileToCloudinary(files[0], folderName);
    }
};
__decorate([
    (0, common_1.Post)('image'),
    (0, swagger_1.ApiQuery)({ name: 'uploadTo', required: false }),
    (0, common_1.UseInterceptors)((0, platform_express_1.AnyFilesInterceptor)(config_1.uploadOptions)),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Query)('uploadTo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, String]),
    __metadata("design:returntype", void 0)
], UploaderController.prototype, "uploadImageFile", null);
UploaderController = __decorate([
    (0, common_1.UseGuards)(guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('API auth'),
    (0, swagger_1.ApiTags)('uploader'),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [uploader_service_1.UploaderService])
], UploaderController);
exports.UploaderController = UploaderController;
//# sourceMappingURL=uploader.controller.js.map