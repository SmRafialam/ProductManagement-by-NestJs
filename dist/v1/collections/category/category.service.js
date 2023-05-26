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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const common_service_1 = require("../../../common/common.service");
let CategoryService = class CategoryService {
    constructor(categoryModel, commonService) {
        this.categoryModel = categoryModel;
        this.commonService = commonService;
    }
    async addCategory(categoryData, parentId, list = []) {
        var e_1, _a;
        try {
            const { subCategories } = categoryData, saveData = __rest(categoryData, ["subCategories"]);
            if (saveData.hasOwnProperty('parent') && saveData.parent == '') {
                delete saveData.parent;
            }
            const newCategory = new this.categoryModel(Object.assign(Object.assign({}, saveData), { slug: this.commonService.getSlug(saveData.name), parent: parentId && parentId !== '' ? parentId : null }));
            const category = await newCategory.save();
            list.push({
                id: category.id,
                name: category.name,
                slug: category.slug,
                parent: category.parent,
                shortText: category.shortText,
                longText: category.longText,
                media: category.media,
                createdAt: category.createdAt,
                updatedAt: category.updatedAt,
            });
            if (subCategories !== undefined && subCategories.length) {
                try {
                    for (var subCategories_1 = __asyncValues(subCategories), subCategories_1_1; subCategories_1_1 = await subCategories_1.next(), !subCategories_1_1.done;) {
                        const subCategory = subCategories_1_1.value;
                        await this.addCategory(subCategory, category.id.toString(), list);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (subCategories_1_1 && !subCategories_1_1.done && (_a = subCategories_1.return)) await _a.call(subCategories_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            return this.commonService.generateSuccessResponse(list);
        }
        catch (error) {
            this.commonService.errorHandler(error);
        }
    }
    async getCategoryList() {
        try {
            const categories = await this.categoryModel.find().sort({ name: 1 }).exec();
            const returnData = categories.map(category => ({
                id: category.id,
                name: category.name,
                slug: category.slug,
                parent: category.parent,
                shortText: category.shortText,
                longText: category.longText,
                media: category.media,
                createdAt: category.createdAt,
                updatedAt: category.updatedAt,
            }));
            return this.commonService.generateSuccessResponse(returnData);
        }
        catch (error) {
            this.commonService.errorHandler(error);
        }
    }
    async getCategoryById(catId) {
        try {
            const category = await this.categoryModel.findById(catId).exec();
            if (category != null) {
                const returnData = {
                    id: category.id,
                    name: category.name,
                    slug: category.slug,
                    parent: category.parent,
                    shortText: category.shortText,
                    longText: category.longText,
                    media: category.media,
                    createdAt: category.createdAt,
                    updatedAt: category.updatedAt,
                };
                return this.commonService.generateSuccessResponse([returnData]);
            }
            throw new common_1.HttpException('Category not found', common_1.HttpStatus.NOT_FOUND);
        }
        catch (error) {
            this.commonService.errorHandler(error);
        }
    }
    async updateCategory(catId, categoryData) {
        try {
            const category = await this.categoryModel.findByIdAndUpdate(catId, Object.assign(Object.assign({}, categoryData), { slug: this.commonService.getSlug(categoryData.name) }), { new: true }).exec();
            if (category != null) {
                const returnData = {
                    id: category.id,
                    name: category.name,
                    slug: category.slug,
                    parent: category.parent,
                    shortText: category.shortText,
                    longText: category.longText,
                    media: category.media,
                    createdAt: category.createdAt,
                    updatedAt: category.updatedAt,
                };
                return this.commonService.generateSuccessResponse([returnData]);
            }
            throw new common_1.HttpException('Category not found', common_1.HttpStatus.NOT_FOUND);
        }
        catch (error) {
            this.commonService.errorHandler(error);
        }
    }
    async deleteCategory(catId) {
        try {
            const category = await this.categoryModel.findByIdAndDelete(catId).exec();
            if (category != null) {
                await this.categoryModel.updateMany({ parent: category.id }, { $set: { parent: null } });
                const res = {
                    message: `${category.name} category has been deleted successfully`
                };
                return this.commonService.generateSuccessResponse([res]);
            }
            throw new common_1.HttpException('Category not found', common_1.HttpStatus.NOT_FOUND);
        }
        catch (error) {
            this.commonService.errorHandler(error);
        }
    }
    async getCategoryOrNull(catId) {
        try {
            const category = await this.categoryModel.findById(catId).exec();
            if (category != null) {
                const returnData = {
                    id: category.id,
                    name: category.name,
                    slug: category.slug,
                    parent: category.parent,
                    shortText: category.shortText,
                    longText: category.longText,
                    media: category.media,
                    createdAt: category.createdAt,
                    updatedAt: category.updatedAt,
                };
                return returnData;
            }
            return null;
        }
        catch (error) {
            this.commonService.errorHandler(error);
        }
    }
};
CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Category')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        common_service_1.CommonService])
], CategoryService);
exports.CategoryService = CategoryService;
//# sourceMappingURL=category.service.js.map