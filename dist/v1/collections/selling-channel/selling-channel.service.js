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
exports.SellingChannelService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const common_service_1 = require("../../../common/common.service");
let SellingChannelService = class SellingChannelService {
    constructor(sellingChannelModel, commonService) {
        this.sellingChannelModel = sellingChannelModel;
        this.commonService = commonService;
    }
    async getSellingChannelList() {
        try {
            const sellingChannels = await this.sellingChannelModel.find().sort({ name: 1 }).exec();
            const returnData = sellingChannels.map(sellingChannel => ({
                id: sellingChannel.id,
                name: sellingChannel.name,
                destination: sellingChannel.destination,
                country: sellingChannel.country,
                priceList: sellingChannel.priceList,
                screens: sellingChannel.screens,
                createdAt: sellingChannel.createdAt,
                updatedAt: sellingChannel.updatedAt
            }));
            return this.commonService.generateSuccessResponse(returnData);
        }
        catch (error) {
            throw new common_1.HttpException(error, error === null || error === void 0 ? void 0 : error.status);
        }
    }
    async addSellingChannel(data) {
        try {
            const newSellingChannel = new this.sellingChannelModel(Object.assign({}, data));
            const sellingChannel = await newSellingChannel.save();
            const returnData = {
                id: sellingChannel.id,
                name: sellingChannel.name,
                destination: sellingChannel.destination,
                country: sellingChannel.country,
                priceList: sellingChannel.priceList,
                screens: sellingChannel.screens,
                createdAt: sellingChannel.createdAt,
                updatedAt: sellingChannel.updatedAt
            };
            return this.commonService.generateSuccessResponse([returnData]);
        }
        catch (error) {
            throw new common_1.HttpException(error, error === null || error === void 0 ? void 0 : error.status);
        }
    }
    async getSellingChannelById(id) {
        try {
            const sellingChannel = await this.sellingChannelModel.findById(id).exec();
            if (sellingChannel != null) {
                const returnData = {
                    id: sellingChannel.id,
                    name: sellingChannel.name,
                    destination: sellingChannel.destination,
                    country: sellingChannel.country,
                    priceList: sellingChannel.priceList,
                    screens: sellingChannel.screens,
                    createdAt: sellingChannel.createdAt,
                    updatedAt: sellingChannel.updatedAt
                };
                return this.commonService.generateSuccessResponse([returnData]);
            }
            throw new common_1.HttpException('Selling channel not found', common_1.HttpStatus.NOT_FOUND);
        }
        catch (error) {
            throw new common_1.HttpException(error, error === null || error === void 0 ? void 0 : error.status);
        }
    }
    async updateSellingChannel(id, updateData) {
        try {
            const sellingChannel = await this.sellingChannelModel.findByIdAndUpdate(id, Object.assign({}, updateData), { new: true }).exec();
            if (sellingChannel != null) {
                const returnData = {
                    id: sellingChannel.id,
                    name: sellingChannel.name,
                    destination: sellingChannel.destination,
                    country: sellingChannel.country,
                    priceList: sellingChannel.priceList,
                    screens: sellingChannel.screens,
                    createdAt: sellingChannel.createdAt,
                    updatedAt: sellingChannel.updatedAt
                };
                return this.commonService.generateSuccessResponse([returnData]);
            }
            throw new common_1.HttpException('Selling channel not found', common_1.HttpStatus.NOT_FOUND);
        }
        catch (error) {
            throw new common_1.HttpException(error, error === null || error === void 0 ? void 0 : error.status);
        }
    }
    async deleteSellingChannel(id) {
        try {
            const sellingChannel = await this.sellingChannelModel.findByIdAndDelete(id).exec();
            if (sellingChannel != null) {
                const res = {
                    message: `${sellingChannel.name} selling channel has been deleted successfully`
                };
                return this.commonService.generateSuccessResponse([res]);
            }
            throw new common_1.HttpException('Selling channel not found', common_1.HttpStatus.NOT_FOUND);
        }
        catch (error) {
            throw new common_1.HttpException(error, error === null || error === void 0 ? void 0 : error.status);
        }
    }
};
SellingChannelService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Selling_Channel')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        common_service_1.CommonService])
], SellingChannelService);
exports.SellingChannelService = SellingChannelService;
//# sourceMappingURL=selling-channel.service.js.map