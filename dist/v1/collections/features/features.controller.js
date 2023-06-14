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
exports.FeaturesController = void 0;
const common_1 = require("@nestjs/common");
const features_service_1 = require("./features.service");
const create_feature_dto_1 = require("./dto/create-feature.dto");
const update_feature_dto_1 = require("./dto/update-feature.dto");
let FeaturesController = class FeaturesController {
    constructor(featuresService) {
        this.featuresService = featuresService;
    }
    create(createFeatureDto) {
        return this.featuresService.createFeature(createFeatureDto);
    }
    findAll() {
        return this.featuresService.getAllFeatures();
    }
    findOne(id) {
        return this.featuresService.getFeatureById(id);
    }
    update(id, updateFeatureDto) {
        return this.featuresService.updateFeature(id, updateFeatureDto);
    }
    remove(id) {
        return this.featuresService.removeFeature(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_feature_dto_1.CreateFeatureDto]),
    __metadata("design:returntype", void 0)
], FeaturesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FeaturesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FeaturesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_feature_dto_1.UpdateFeatureDto]),
    __metadata("design:returntype", void 0)
], FeaturesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FeaturesController.prototype, "remove", null);
FeaturesController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [features_service_1.FeaturesService])
], FeaturesController);
exports.FeaturesController = FeaturesController;
//# sourceMappingURL=features.controller.js.map