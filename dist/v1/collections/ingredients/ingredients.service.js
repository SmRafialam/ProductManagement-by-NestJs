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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IngredientsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const common_service_1 = require("../../../common/common.service");
let IngredientsService = class IngredientsService {
    constructor(ingredientModel, commonService) {
        this.ingredientModel = ingredientModel;
        this.commonService = commonService;
    }
    async createIngredient(ingredientData) {
        try {
            const { subIngredients } = ingredientData, ingredientFields = __rest(ingredientData, ["subIngredients"]);
            const newIngredient = new this.ingredientModel(ingredientFields);
            const ingredient = await newIngredient.save();
            if (subIngredients && subIngredients.length > 0) {
                const subIngredientsList = [];
                for (const subIngredientData of subIngredients) {
                    console.log(subIngredientData);
                    if (subIngredientData.title) {
                        const subIngredient = {
                            title: subIngredientData.title,
                            isSubIngredient: true,
                            parent: ingredient._id,
                        };
                        const existingSubIngredient = await this.ingredientModel.findOne({ title: subIngredient.title }).exec();
                        if (existingSubIngredient) {
                            if (subIngredient.title === ingredient.title) {
                                continue;
                            }
                            subIngredientsList.push(existingSubIngredient._id);
                            console.log('existingSubIngredient', existingSubIngredient);
                        }
                        else {
                            const createdSubIngredient = new this.ingredientModel(subIngredient);
                            const savedSubIngredient = await createdSubIngredient.save();
                            subIngredientsList.push(savedSubIngredient._id);
                        }
                    }
                }
                console.log(subIngredientsList);
                ingredient.subIngredients = subIngredientsList;
                await ingredient.save();
            }
            const populatedIngredient = await this.ingredientModel.findById(ingredient._id).populate('subIngredients');
            return this.commonService.generateSuccessResponse(populatedIngredient);
        }
        catch (error) {
            console.log(error);
            this.commonService.errorHandler(error);
        }
    }
    async getIngredientList() {
        try {
            const ingredients = await this.ingredientModel.find().populate('subIngredients').exec();
            const returnData = ingredients.map(ingredient => ({
                id: ingredient.id,
                title: ingredient.title,
                dailyValue: ingredient.dailyValue,
                description: ingredient.description,
                showDescription: ingredient.showDescription,
                image: ingredient.image,
                icon: ingredient.icon,
                subIngredients: ingredient.subIngredients
            }));
            return this.commonService.generateSuccessResponse(returnData);
        }
        catch (error) {
            this.commonService.errorHandler(error);
        }
    }
    async getIngredientById(ingredientId) {
        try {
            const ingredient = await this.ingredientModel.findById(ingredientId).populate('subIngredients').exec();
            if (ingredient != null) {
                const returnData = {
                    id: ingredient.id,
                    title: ingredient.title,
                    dailyValue: ingredient.dailyValue,
                    description: ingredient.description,
                    showDescription: ingredient.showDescription,
                    image: ingredient.image,
                    icon: ingredient.icon,
                    subIngredients: ingredient.subIngredients,
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
            const { subIngredients } = ingredientData, ingredientFields = __rest(ingredientData, ["subIngredients"]);
            console.log(subIngredients);
            const updatedIngredient = await this.ingredientModel
                .findByIdAndUpdate(ingredientId, Object.assign(Object.assign({}, ingredientFields), { dailyValue: Object.assign({}, ingredientFields.dailyValue), slug: this.commonService.getSlug(ingredientFields.title) }), { new: true }).populate('subIngredients')
                .exec();
            console.log(updatedIngredient);
            if (updatedIngredient) {
                if (subIngredients && subIngredients.length > 0) {
                    const subIngredientsList = [];
                    for (const subIngredientData of subIngredients) {
                        console.log(subIngredientData);
                        if (subIngredientData.title) {
                            const subIngredient = {
                                title: subIngredientData.title,
                                isSubIngredient: true,
                                parent: updatedIngredient._id,
                            };
                            const createdSubIngredient = new this.ingredientModel(subIngredient);
                            const savedSubIngredient = await createdSubIngredient.save();
                            subIngredientsList.push(savedSubIngredient._id);
                        }
                    }
                    updatedIngredient.subIngredients = subIngredientsList;
                    await updatedIngredient.save();
                }
                else {
                    updatedIngredient.subIngredients = [];
                    await updatedIngredient.save();
                }
                return this.commonService.generateSuccessResponse(updatedIngredient);
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
    async createBulkIngredients(ingredientData) {
        try {
            const createdIngredients = [];
            const createSubIngredients = async (parent, subIngredients) => {
                for (const subIngredientData of subIngredients) {
                    const subIngredient = new this.ingredientModel({ title: subIngredientData.title });
                    const savedSubIngredient = await subIngredient.save();
                    parent.subIngredients.push(savedSubIngredient.id);
                    await createSubIngredients(savedSubIngredient, subIngredientData.subIngredients);
                }
            };
            for (const ingredient of ingredientData) {
                const mainIngredient = new this.ingredientModel({ title: ingredient.title });
                await createSubIngredients(mainIngredient, ingredient.subIngredients);
                const savedMainIngredient = await mainIngredient.save();
                createdIngredients.push(savedMainIngredient);
            }
            const populatedIngredients = await this.ingredientModel.populate(createdIngredients, { path: 'subIngredients' });
            return this.commonService.generateSuccessResponse(populatedIngredients);
        }
        catch (error) {
            console.log(error);
            this.commonService.errorHandler(error);
        }
    }
    async createSubIngredients(parentId, subIngredients) {
        for (const subIngredient of subIngredients) {
            const subIngredientDoc = new this.ingredientModel({ title: subIngredient.title });
            console.log("subIng", subIngredientDoc, parentId);
            const savedSubIngredient = await subIngredientDoc.save();
            if (subIngredient.subIngredients && subIngredient.subIngredients.length > 0) {
                await this.createSubIngredients(savedSubIngredient._id, subIngredient.subIngredients);
            }
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