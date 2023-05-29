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
exports.IngredientsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const common_service_1 = require("../../common/common.service");
let IngredientsService = class IngredientsService {
    constructor(ingredientModel, commonService) {
        this.ingredientModel = ingredientModel;
        this.commonService = commonService;
    }
    async createIngredient(ingredientData) {
        console.log(ingredientData);
        try {
            const newIngredient = new this.ingredientModel(Object.assign({}, ingredientData));
            const ingredient = await newIngredient.save();
            console.log(ingredient);
            const returnData = {
                id: ingredient.id,
                title: ingredient.title,
                dailyValue: ingredient.dailyValue,
                description: ingredient.description,
                showDescription: ingredient.showDescription,
                image: ingredient.image,
                icon: ingredient.icon
            };
            console.log(returnData);
            return this.commonService.generateSuccessResponse([
                returnData,
            ]);
        }
        catch (error) {
            console.log(error);
            this.commonService.errorHandler(error);
        }
    }
    async getIngredientList() {
        try {
            const ingredients = await this.ingredientModel.find().exec();
            const returnData = ingredients.map((ingredient) => ({
                id: ingredient.id,
                title: ingredient.title,
                dailyValue: ingredient.dailyValue,
                description: ingredient.description,
                showDescription: ingredient.showDescription,
                image: ingredient.image,
                icon: ingredient.icon,
            }));
            return this.commonService.generateSuccessResponse(returnData);
        }
        catch (error) {
            this.commonService.errorHandler(error);
        }
    }
    async getIngredientById(ingredientId) {
        try {
            const ingredient = await this.ingredientModel.findById(ingredientId).exec();
            if (ingredient != null) {
                const returnData = {
                    id: ingredient.id,
                    title: ingredient.title,
                    dailyValue: ingredient.dailyValue,
                    description: ingredient.description,
                    showDescription: ingredient.showDescription,
                    image: ingredient.image,
                    icon: ingredient.icon,
                };
                return this.commonService.generateSuccessResponse([
                    returnData,
                ]);
            }
            throw new common_1.HttpException('Ingredient not found', common_1.HttpStatus.NOT_FOUND);
        }
        catch (error) {
            this.commonService.errorHandler(error);
        }
    }
    async updateIngredient(ingredientId, ingredientData) {
        try {
            const updatedIngredient = await this.ingredientModel
                .findByIdAndUpdate(ingredientId, Object.assign(Object.assign({}, ingredientData), { dailyValue: Object.assign({}, ingredientData.dailyValue), slug: this.commonService.getSlug(ingredientData.title) }), { new: true })
                .exec();
            console.log(updatedIngredient);
            if (updatedIngredient) {
                const returnData = {
                    id: updatedIngredient.id,
                    title: updatedIngredient.title,
                    dailyValue: updatedIngredient.dailyValue,
                    description: updatedIngredient.description,
                    showDescription: updatedIngredient.showDescription,
                    image: updatedIngredient.image,
                    icon: updatedIngredient.icon,
                };
                return this.commonService.generateSuccessResponse([
                    returnData,
                ]);
            }
            throw new common_1.HttpException('Ingredient not found', common_1.HttpStatus.NOT_FOUND);
        }
        catch (error) {
            console.log(error);
            this.commonService.errorHandler(error);
        }
    }
    async deleteIngredient(ingredientId) {
        try {
            const ingredient = await this.ingredientModel.findByIdAndDelete(ingredientId).exec();
            if (ingredient != null) {
                const res = {
                    message: `${ingredient.title} ingredient has been deleted successfully`,
                };
                return this.commonService.generateSuccessResponse([res]);
            }
            throw new common_1.HttpException('Ingredient not found', common_1.HttpStatus.NOT_FOUND);
        }
        catch (error) {
            this.commonService.errorHandler(error);
        }
    }
};
IngredientsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Ingredient')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        common_service_1.CommonService])
], IngredientsService);
exports.IngredientsService = IngredientsService;
//# sourceMappingURL=ingredients.service.js.map