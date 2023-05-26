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
exports.ChoiceService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const common_service_1 = require("../../../../common/common.service");
let ChoiceService = class ChoiceService {
    constructor(attributeModel, choiceModel, commonService) {
        this.attributeModel = attributeModel;
        this.choiceModel = choiceModel;
        this.commonService = commonService;
    }
    async getChoiceList() {
        try {
            const choices = await this.choiceModel.find().sort({ name: 1 }).exec();
            const returnData = choices.map(choice => ({
                id: choice.id,
                name: choice.name,
                attribute: choice.attribute,
                createdAt: choice.createdAt,
                updatedAt: choice.updatedAt
            }));
            return this.commonService.generateSuccessResponse(returnData);
        }
        catch (error) {
            throw new common_1.HttpException(error, error.status);
        }
    }
    async addChoice(choiceData) {
        try {
            const newChoice = new this.choiceModel(Object.assign({}, choiceData));
            const choice = await newChoice.save();
            await this.attributeModel.updateOne({ '_id': choice.attribute }, { $push: { choices: choice.id } });
            const returnData = {
                id: choice.id,
                name: choice.name,
                attribute: choice.attribute,
                createdAt: choice.createdAt,
                updatedAt: choice.updatedAt
            };
            return this.commonService.generateSuccessResponse([returnData]);
        }
        catch (error) {
            if (error.code == '11000') {
                throw new common_1.HttpException('Choice name already exist', common_1.HttpStatus.CONFLICT);
            }
            else if (error.kind == 'ObjectId' || error.name == 'ValidationError') {
                throw new common_1.HttpException('Bad request', common_1.HttpStatus.BAD_REQUEST);
            }
            throw new common_1.HttpException('Something went wrong', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateChoice(choiceId, choiceData) {
        try {
            const choice = await this.choiceModel.findByIdAndUpdate(choiceId, Object.assign({}, choiceData), { new: true }).exec();
            if (choice != null) {
                const returnData = {
                    id: choice.id,
                    name: choice.name,
                    attribute: choice.attribute,
                    createdAt: choice.createdAt,
                    updatedAt: choice.updatedAt
                };
                return this.commonService.generateSuccessResponse([returnData]);
            }
            throw new common_1.HttpException('Choice not found', common_1.HttpStatus.NOT_FOUND);
        }
        catch (error) {
            if (error.status == 404) {
                throw new common_1.HttpException('Not found', common_1.HttpStatus.NOT_FOUND);
            }
            else if (error.kind == 'ObjectId' || error.name == 'ValidationError') {
                throw new common_1.HttpException('Bad request', common_1.HttpStatus.BAD_REQUEST);
            }
            else {
                throw new common_1.HttpException('Something went wrong', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
    async deleteChoice(choiceId) {
        try {
            const choice = await this.choiceModel.findByIdAndDelete(choiceId).exec();
            if (choice != null) {
                await this.attributeModel.updateOne({ '_id': choice.attribute }, { $pull: { choices: choice.id } });
                const res = {
                    message: `${choice.name} choice has been deleted successfully`
                };
                return this.commonService.generateSuccessResponse([res]);
            }
            throw new common_1.HttpException('Attribute not found', common_1.HttpStatus.NOT_FOUND);
        }
        catch (error) {
            if (error.status == 404) {
                throw new common_1.HttpException('Not found', common_1.HttpStatus.NOT_FOUND);
            }
            else if (error.kind == 'ObjectId' || error.name == 'ValidationError') {
                throw new common_1.HttpException('Bad request', common_1.HttpStatus.BAD_REQUEST);
            }
            else {
                throw new common_1.HttpException('Something went wrong', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
};
ChoiceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Attribute')),
    __param(1, (0, mongoose_1.InjectModel)('Choice')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        common_service_1.CommonService])
], ChoiceService);
exports.ChoiceService = ChoiceService;
//# sourceMappingURL=choice.service.js.map