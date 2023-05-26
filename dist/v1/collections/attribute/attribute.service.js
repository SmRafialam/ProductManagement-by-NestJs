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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const common_service_1 = require("../../../common/common.service");
let AttributeService = class AttributeService {
    constructor(attributeModel, choiceModel, commonService) {
        this.attributeModel = attributeModel;
        this.choiceModel = choiceModel;
        this.commonService = commonService;
    }
    async addAttribute(attrData) {
        try {
            const newAttribute = new this.attributeModel(Object.assign({}, attrData));
            const attr = await newAttribute.save();
            const returnData = {
                id: attr.id,
                name: attr.name,
                choices: attr.choices,
                createdAt: attr.createdAt,
                updatedAt: attr.updatedAt
            };
            return this.commonService.generateSuccessResponse([returnData]);
        }
        catch (error) {
            throw new common_1.HttpException(error, error.status);
        }
    }
    async getAttributeList() {
        try {
            const attributes = await this.attributeModel.find().sort({ name: 1 }).populate('choices').exec();
            const returnData = attributes.map(attr => ({
                id: attr.id,
                name: attr.name,
                choices: attr.choices.map((choice) => ({
                    id: choice.id,
                    name: choice.name,
                    suffix: choice.suffix
                })),
                createdAt: attr.createdAt,
                updatedAt: attr.updatedAt
            }));
            return this.commonService.generateSuccessResponse(returnData);
        }
        catch (error) {
            throw new common_1.HttpException(error, error.status);
        }
    }
    async getAttributeById(attrId) {
        try {
            const attr = await this.attributeModel.findById(attrId).populate('choices').exec();
            if (attr != null) {
                const returnData = {
                    id: attr.id,
                    name: attr.name,
                    choices: attr.choices.map((choice) => ({
                        id: choice.id,
                        name: choice.name,
                        suffix: choice.suffix
                    })),
                    createdAt: attr.createdAt,
                    updatedAt: attr.updatedAt
                };
                return this.commonService.generateSuccessResponse([returnData]);
            }
            throw new common_1.HttpException('Attribute not found', common_1.HttpStatus.NOT_FOUND);
        }
        catch (error) {
            throw new common_1.HttpException(error, error.status);
        }
    }
    async addChoice(choiceData) {
        try {
            const newChoice = new this.choiceModel(Object.assign({}, choiceData));
            const choice = await newChoice.save();
            const choiceObj = {
                choiceID: choice.id.toString()
            };
            return this.commonService.generateSuccessResponse([choiceObj]);
        }
        catch (error) {
            this.commonService.errorHandler(error);
        }
    }
    getUniqueChoices(newChoices, attribute) {
        const uniqueChoices = [...new Map(newChoices.map(choice => [choice.name, choice])).values()];
        const availableChoices = attribute.choices.map((choice) => choice.name);
        const matchedChoices = uniqueChoices.filter(choice => availableChoices.indexOf(choice.name) !== -1);
        if (matchedChoices.length)
            throw new common_1.HttpException('some choices already exists', common_1.HttpStatus.CONFLICT);
        return uniqueChoices;
    }
    async updateAttribute(attrId, attrData) {
        var e_1, _a;
        try {
            const attribute = await this.attributeModel.findById(attrId).populate('choices').exec();
            const newChoices = [];
            if (attribute != null) {
                const { choices } = attrData, saveData = __rest(attrData, ["choices"]);
                if (choices !== undefined) {
                    const uniqueChoices = this.getUniqueChoices(choices, attribute);
                    try {
                        for (var uniqueChoices_1 = __asyncValues(uniqueChoices), uniqueChoices_1_1; uniqueChoices_1_1 = await uniqueChoices_1.next(), !uniqueChoices_1_1.done;) {
                            const choice = uniqueChoices_1_1.value;
                            const data = Object.assign(Object.assign({}, choice), { attribute: attrId });
                            const { result } = await this.addChoice(data);
                            newChoices.push(result[0].choiceID);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (uniqueChoices_1_1 && !uniqueChoices_1_1.done && (_a = uniqueChoices_1.return)) await _a.call(uniqueChoices_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
                const choiceList = newChoices.length ? [...attribute.choices, ...newChoices] : [...attribute.choices];
                const attr = await this.attributeModel.findByIdAndUpdate(attrId, Object.assign(Object.assign({}, saveData), { choices: choiceList }), { new: true }).exec();
                const returnData = {
                    id: attr.id,
                    name: attr.name,
                    choices: attr.choices,
                    createdAt: attr.createdAt,
                    updatedAt: attr.updatedAt
                };
                return this.commonService.generateSuccessResponse([returnData]);
            }
            throw new common_1.HttpException('Attribute not found', common_1.HttpStatus.NOT_FOUND);
        }
        catch (error) {
            throw new common_1.HttpException(error, error.status);
        }
    }
    async deleteAttribute(attrId) {
        try {
            const attr = await this.attributeModel.findByIdAndDelete(attrId).exec();
            if (attr != null) {
                await this.choiceModel.deleteMany({ attribute: attr.id });
                const res = {
                    message: `${attr.name} attribute has been deleted successfully`
                };
                return this.commonService.generateSuccessResponse([res]);
            }
            throw new common_1.HttpException('Attribute not found', common_1.HttpStatus.NOT_FOUND);
        }
        catch (error) {
            throw new common_1.HttpException(error, error.status);
        }
    }
};
AttributeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Attribute')),
    __param(1, (0, mongoose_1.InjectModel)('Choice')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        common_service_1.CommonService])
], AttributeService);
exports.AttributeService = AttributeService;
//# sourceMappingURL=attribute.service.js.map