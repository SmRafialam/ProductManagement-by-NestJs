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
exports.TagService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const common_service_1 = require("../../../common/common.service");
let TagService = class TagService {
    constructor(tagModel, commonService) {
        this.tagModel = tagModel;
        this.commonService = commonService;
    }
    async getTagList() {
        try {
            const tags = await this.tagModel.find().sort({ name: 1 }).exec();
            const returnData = tags.map(tag => ({
                id: tag.id,
                name: tag.name,
                createdAt: tag.createdAt,
                updatedAt: tag.updatedAt
            }));
            return this.commonService.generateSuccessResponse(returnData);
        }
        catch (error) {
            throw new common_1.HttpException(error, error === null || error === void 0 ? void 0 : error.status);
        }
    }
    async addTag(data) {
        try {
            const newTag = new this.tagModel(Object.assign({}, data));
            const tag = await newTag.save();
            const returnData = {
                id: tag.id,
                name: tag.name,
                createdAt: tag.createdAt,
                updatedAt: tag.updatedAt
            };
            return this.commonService.generateSuccessResponse([returnData]);
        }
        catch (error) {
            throw new common_1.HttpException(error, error === null || error === void 0 ? void 0 : error.status);
        }
    }
    async getTagById(id) {
        try {
            const tag = await this.tagModel.findById(id).exec();
            if (tag != null) {
                const returnData = {
                    id: tag.id,
                    name: tag.name,
                    createdAt: tag.createdAt,
                    updatedAt: tag.updatedAt
                };
                return this.commonService.generateSuccessResponse([returnData]);
            }
            throw new common_1.HttpException('Tag not found', common_1.HttpStatus.NOT_FOUND);
        }
        catch (error) {
            throw new common_1.HttpException(error, error === null || error === void 0 ? void 0 : error.status);
        }
    }
    async updateTag(id, updateData) {
        try {
            const tag = await this.tagModel.findByIdAndUpdate(id, Object.assign({}, updateData), { new: true }).exec();
            if (tag != null) {
                const returnData = {
                    id: tag.id,
                    name: tag.name,
                    createdAt: tag.createdAt,
                    updatedAt: tag.updatedAt
                };
                return this.commonService.generateSuccessResponse([returnData]);
            }
            throw new common_1.HttpException('Tag not found', common_1.HttpStatus.NOT_FOUND);
        }
        catch (error) {
            throw new common_1.HttpException(error, error === null || error === void 0 ? void 0 : error.status);
        }
    }
    async deleteTag(id) {
        try {
            const tag = await this.tagModel.findByIdAndDelete(id).exec();
            if (tag != null) {
                const res = {
                    message: `${tag.name} tag has been deleted successfully`
                };
                return this.commonService.generateSuccessResponse([res]);
            }
        }
        catch (error) {
            throw new common_1.HttpException(error, error === null || error === void 0 ? void 0 : error.status);
        }
    }
};
TagService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Tag')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        common_service_1.CommonService])
], TagService);
exports.TagService = TagService;
//# sourceMappingURL=tag.service.js.map