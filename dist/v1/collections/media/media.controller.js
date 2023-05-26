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
exports.MediaController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const guard_1 = require("../../auth/guard");
const dto_1 = require("./dto");
const media_service_1 = require("./media.service");
let MediaController = class MediaController {
    constructor(mediaService) {
        this.mediaService = mediaService;
    }
    getCategoryList() {
        return this.mediaService.getCategoryList();
    }
    addMediaCategory(mediaCatCreateDto) {
        return this.mediaService.addMediaCategory(mediaCatCreateDto);
    }
    editMediaCategory(mediaCatId, mediaCatUpdateDto) {
        return this.mediaService.editMediaCategory(mediaCatId, mediaCatUpdateDto);
    }
    deleteMediaCategory(mediaCatId) {
        return this.mediaService.deleteMediaCategory(mediaCatId);
    }
    getMediaList() {
        return this.mediaService.getMediaList();
    }
    addMedia(mediaCreateDto) {
        return this.mediaService.addMedia(mediaCreateDto);
    }
    editMedia(mediaCatId, mediaUpdateDto) {
        return this.mediaService.editMedia(mediaCatId, mediaUpdateDto);
    }
    deleteMedia(mediaCatId) {
        return this.mediaService.deleteMedia(mediaCatId);
    }
};
__decorate([
    (0, common_1.Get)('category'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MediaController.prototype, "getCategoryList", null);
__decorate([
    (0, common_1.Post)('category'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.MediaCategoryDto]),
    __metadata("design:returntype", void 0)
], MediaController.prototype, "addMediaCategory", null);
__decorate([
    (0, common_1.Patch)('category/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.MediaCategoryDto]),
    __metadata("design:returntype", void 0)
], MediaController.prototype, "editMediaCategory", null);
__decorate([
    (0, common_1.Delete)('category/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MediaController.prototype, "deleteMediaCategory", null);
__decorate([
    (0, common_1.Get)('input'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MediaController.prototype, "getMediaList", null);
__decorate([
    (0, common_1.Post)('input'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.MediaCreateDto]),
    __metadata("design:returntype", void 0)
], MediaController.prototype, "addMedia", null);
__decorate([
    (0, common_1.Patch)('input/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.MediaUpdateDto]),
    __metadata("design:returntype", void 0)
], MediaController.prototype, "editMedia", null);
__decorate([
    (0, common_1.Delete)('input/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MediaController.prototype, "deleteMedia", null);
MediaController = __decorate([
    (0, common_1.UseGuards)(guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('API auth'),
    (0, swagger_1.ApiTags)('media'),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [media_service_1.MediaService])
], MediaController);
exports.MediaController = MediaController;
//# sourceMappingURL=media.controller.js.map