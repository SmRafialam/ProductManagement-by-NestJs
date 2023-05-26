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
exports.MediaService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const common_service_1 = require("../../../common/common.service");
let MediaService = class MediaService {
    constructor(mediaCategoryModel, mediaModel, commonService) {
        this.mediaCategoryModel = mediaCategoryModel;
        this.mediaModel = mediaModel;
        this.commonService = commonService;
    }
    async getCategoryList() {
        try {
            const mediaList = await this.mediaCategoryModel.find().sort({ name: 1 }).populate('media').exec();
            const returnData = mediaList.map(media => ({
                id: media.id,
                name: media.name,
                description: media.description,
                media: media.media.map((item) => ({
                    id: item.id,
                    name: item.name,
                    description: item.description,
                    category: item.category,
                    extensions: item.extensions,
                    sizeLimit: item.sizeLimit,
                    quantity: item.quantity,
                    createdAt: item.createdAt,
                    updatedAt: item.updatedAt
                })),
                createdAt: media.createdAt,
                updatedAt: media.updatedAt
            }));
            return this.commonService.generateSuccessResponse(returnData);
        }
        catch (error) {
            throw new common_1.HttpException(error, error.status);
        }
    }
    async addMediaCategory(data) {
        try {
            const newMediaCat = new this.mediaCategoryModel(Object.assign({}, data));
            const media = await newMediaCat.save();
            const returnData = {
                id: media.id,
                name: media.name,
                description: media.description,
                media: media.media,
                createdAt: media.createdAt,
                updatedAt: media.updatedAt
            };
            return this.commonService.generateSuccessResponse([returnData]);
        }
        catch (error) {
            throw new common_1.HttpException(error, error.status);
        }
    }
    async editMediaCategory(mediaCatId, updateData) {
        try {
            const media = await this.mediaCategoryModel.findByIdAndUpdate(mediaCatId, Object.assign({}, updateData), { new: true }).exec();
            if (media != null) {
                const returnData = {
                    id: media.id,
                    name: media.name,
                    description: media.description,
                    media: media.media,
                    createdAt: media.createdAt,
                    updatedAt: media.updatedAt
                };
                return this.commonService.generateSuccessResponse([returnData]);
            }
            throw new common_1.HttpException('Media not found', common_1.HttpStatus.NOT_FOUND);
        }
        catch (error) {
            throw new common_1.HttpException(error, error.status);
        }
    }
    async deleteMediaCategory(mediaCatId) {
        try {
            const media = await this.mediaCategoryModel.findByIdAndDelete(mediaCatId).exec();
            if (media != null) {
                const res = {
                    message: `${media.name} media category has been deleted successfully`
                };
                return this.commonService.generateSuccessResponse([res]);
            }
            throw new common_1.HttpException('Media not found', common_1.HttpStatus.NOT_FOUND);
        }
        catch (error) {
            throw new common_1.HttpException(error, error.status);
        }
    }
    async getMediaList() {
        try {
            const mediaList = await this.mediaModel.find().sort({ name: 1 }).exec();
            const returnData = mediaList.map(media => ({
                id: media.id,
                name: media.name,
                description: media.description,
                category: media.category,
                extensions: media.extensions,
                sizeLimit: media.sizeLimit,
                quantity: media.quantity,
                createdAt: media.createdAt,
                updatedAt: media.updatedAt
            }));
            return this.commonService.generateSuccessResponse(returnData);
        }
        catch (error) {
            throw new common_1.HttpException(error, error.status);
        }
    }
    async addMedia(data) {
        try {
            const newMedia = new this.mediaModel(Object.assign({}, data));
            const media = await newMedia.save();
            await this.mediaCategoryModel.updateOne({ '_id': data.category }, { $push: { media: media.id } });
            const returnData = {
                id: media.id,
                name: media.name,
                description: media.description,
                category: media.category,
                extensions: media.extensions,
                sizeLimit: media.sizeLimit,
                quantity: media.quantity,
                createdAt: media.createdAt,
                updatedAt: media.updatedAt
            };
            return this.commonService.generateSuccessResponse([returnData]);
        }
        catch (error) {
            throw new common_1.HttpException(error, error.status);
        }
    }
    async editMedia(mediaId, updateData) {
        try {
            const media = await this.mediaModel.findByIdAndUpdate(mediaId, Object.assign({}, updateData), { new: true }).exec();
            if (media != null) {
                const returnData = {
                    id: media.id,
                    name: media.name,
                    description: media.description,
                    category: media.category,
                    extensions: media.extensions,
                    sizeLimit: media.sizeLimit,
                    quantity: media.quantity,
                    createdAt: media.createdAt,
                    updatedAt: media.updatedAt
                };
                return this.commonService.generateSuccessResponse([returnData]);
            }
            throw new common_1.HttpException('Faq not found', common_1.HttpStatus.NOT_FOUND);
        }
        catch (error) {
            throw new common_1.HttpException(error, error.status);
        }
    }
    async deleteMedia(mediaId) {
        try {
            const media = await this.mediaModel.findByIdAndDelete(mediaId).exec();
            if (media != null) {
                await this.mediaCategoryModel.updateOne({ '_id': media.category }, { $pull: { media: media.id } });
                const res = {
                    message: `${media.name} has been deleted successfully`
                };
                return this.commonService.generateSuccessResponse([res]);
            }
            throw new common_1.HttpException('Media not found', common_1.HttpStatus.NOT_FOUND);
        }
        catch (error) {
            throw new common_1.HttpException(error, error.status);
        }
    }
};
MediaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Media_Category')),
    __param(1, (0, mongoose_1.InjectModel)('Media')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        common_service_1.CommonService])
], MediaService);
exports.MediaService = MediaService;
//# sourceMappingURL=media.service.js.map