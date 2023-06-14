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
exports.FeaturesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const common_service_1 = require("../../../common/common.service");
let FeaturesService = class FeaturesService {
    constructor(featureModel, commonService) {
        this.featureModel = featureModel;
        this.commonService = commonService;
    }
    async createFeature(featureData) {
        try {
            const { title, image, icon, description } = featureData;
            const newFeature = new this.featureModel({
                title,
                image,
                icon,
                description,
            });
            const feature = await newFeature.save();
            const returnData = {
                id: feature.id,
                title: feature.title,
                image: feature.image,
                icon: feature.icon,
                description: feature.description,
            };
            return this.commonService.generateSuccessResponse([returnData]);
        }
        catch (error) {
            this.commonService.errorHandler(error);
        }
    }
    async getAllFeatures() {
        try {
            const features = await this.featureModel.find().exec();
            const returnData = features.map((feature) => ({
                id: feature.id,
                title: feature.title,
                image: feature.image,
                icon: feature.icon,
                description: feature.description,
            }));
            return this.commonService.generateSuccessResponse(returnData);
        }
        catch (error) {
            this.commonService.errorHandler(error);
        }
    }
    async getFeatureById(featureId) {
        try {
            const feature = await this.featureModel.findById(featureId).exec();
            if (feature !== null) {
                const returnData = {
                    id: feature.id,
                    title: feature.title,
                    image: feature.image,
                    icon: feature.icon,
                    description: feature.description,
                };
                return this.commonService.generateSuccessResponse([returnData]);
            }
            throw new common_1.HttpException('Feature not found', common_1.HttpStatus.NOT_FOUND);
        }
        catch (error) {
            this.commonService.errorHandler(error);
        }
    }
    async updateFeature(featureId, featureData) {
        try {
            const feature = await this.featureModel.findByIdAndUpdate(featureId, Object.assign({}, featureData), { new: true }).exec();
            if (feature !== null) {
                const returnData = {
                    id: feature.id,
                    title: feature.title,
                    image: feature.image,
                    icon: feature.icon,
                    description: feature.description,
                };
                return this.commonService.generateSuccessResponse([returnData]);
            }
            throw new common_1.HttpException('Feature not found', common_1.HttpStatus.NOT_FOUND);
        }
        catch (error) {
            this.commonService.errorHandler(error);
        }
    }
    async removeFeature(featureId) {
        try {
            const feature = await this.featureModel.findByIdAndDelete(featureId).exec();
            if (feature != null) {
                const res = {
                    message: `Feature with ID ${feature.id} has been deleted successfully`,
                };
                return this.commonService.generateSuccessResponse([res]);
            }
            throw new common_1.HttpException('Feature not found', common_1.HttpStatus.NOT_FOUND);
        }
        catch (error) {
            this.commonService.errorHandler(error);
        }
    }
};
FeaturesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Feature')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        common_service_1.CommonService])
], FeaturesService);
exports.FeaturesService = FeaturesService;
//# sourceMappingURL=features.service.js.map