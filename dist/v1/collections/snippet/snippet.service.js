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
exports.SnippetService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const common_service_1 = require("../../../common/common.service");
let SnippetService = class SnippetService {
    constructor(snippetCategoryModel, snippetModel, commonService) {
        this.snippetCategoryModel = snippetCategoryModel;
        this.snippetModel = snippetModel;
        this.commonService = commonService;
    }
    async getCategoryList() {
        try {
            const snippetList = await this.snippetCategoryModel.find().sort({ name: 1 }).populate('snippets').exec();
            const returnData = snippetList.map(snippet => ({
                id: snippet.id,
                name: snippet.name,
                snippets: snippet.snippets.map((item) => ({
                    id: item.id,
                    name: item.name,
                    snippetId: item.snippetId,
                    category: item.category,
                    text: item.text,
                    createdAt: item.createdAt,
                    updatedAt: item.updatedAt
                })),
                createdAt: snippet.createdAt,
                updatedAt: snippet.updatedAt
            }));
            return this.commonService.generateSuccessResponse(returnData);
        }
        catch (error) {
            throw new common_1.HttpException(error, error.status);
        }
    }
    async addCategory(data) {
        try {
            const newCat = new this.snippetCategoryModel(Object.assign({}, data));
            const snippet = await newCat.save();
            const returnData = {
                id: snippet.id,
                name: snippet.name,
                snippets: snippet.snippets,
                createdAt: snippet.createdAt,
                updatedAt: snippet.updatedAt
            };
            return this.commonService.generateSuccessResponse([returnData]);
        }
        catch (error) {
            throw new common_1.HttpException(error, error.status);
        }
    }
    async updateCategory(id, updateData) {
        try {
            const snippet = await this.snippetCategoryModel.findByIdAndUpdate(id, Object.assign({}, updateData), { new: true }).exec();
            if (snippet != null) {
                const returnData = {
                    id: snippet.id,
                    name: snippet.name,
                    snippets: snippet.snippets,
                    createdAt: snippet.createdAt,
                    updatedAt: snippet.updatedAt
                };
                return this.commonService.generateSuccessResponse([returnData]);
            }
            throw new common_1.HttpException('Snippet category not found', common_1.HttpStatus.NOT_FOUND);
        }
        catch (error) {
            throw new common_1.HttpException(error, error.status);
        }
    }
    async deleteCategory(id) {
        try {
            const snippet = await this.snippetCategoryModel.findByIdAndDelete(id).exec();
            if (snippet != null) {
                const res = {
                    message: `${snippet.name} snippet category has been deleted successfully`
                };
                return this.commonService.generateSuccessResponse([res]);
            }
            throw new common_1.HttpException('Snippet category not found', common_1.HttpStatus.NOT_FOUND);
        }
        catch (error) {
            throw new common_1.HttpException(error, error.status);
        }
    }
    async getSnippetList() {
        try {
            const snippetList = await this.snippetModel.find().sort({ name: 1 }).exec();
            const returnData = snippetList.map(snippet => ({
                id: snippet.id,
                name: snippet.name,
                snippetId: snippet.snippetId,
                category: snippet.category,
                text: snippet.text,
                createdAt: snippet.createdAt,
                updatedAt: snippet.updatedAt
            }));
            return this.commonService.generateSuccessResponse(returnData);
        }
        catch (error) {
            throw new common_1.HttpException(error, error.status);
        }
    }
    async addSnippet(data) {
        try {
            const newSnippet = new this.snippetModel(Object.assign({}, data));
            const snippet = await newSnippet.save();
            await this.snippetCategoryModel.updateOne({ '_id': data.category }, { $push: { snippets: snippet.id } });
            const returnData = {
                id: snippet.id,
                name: snippet.name,
                snippetId: snippet.snippetId,
                category: snippet.category,
                text: snippet.text,
                createdAt: snippet.createdAt,
                updatedAt: snippet.updatedAt
            };
            return this.commonService.generateSuccessResponse([returnData]);
        }
        catch (error) {
            throw new common_1.HttpException(error, error.status);
        }
    }
    async updateSnippet(id, updateData) {
        try {
            const item = await this.snippetModel.findById(id).exec();
            const prevCatId = item.category.toString();
            if (item != null) {
                const snippet = await this.snippetModel.findByIdAndUpdate(id, Object.assign({}, updateData), { new: true }).exec();
                const newCatId = snippet.category.toString();
                if (prevCatId !== newCatId) {
                    await this.snippetCategoryModel.updateOne({ '_id': prevCatId }, { $pull: { snippets: snippet.id } });
                    await this.snippetCategoryModel.updateOne({ '_id': newCatId }, { $push: { snippets: snippet.id } });
                }
                const returnData = {
                    id: snippet.id,
                    name: snippet.name,
                    snippetId: snippet.snippetId,
                    category: snippet.category,
                    text: snippet.text,
                    createdAt: snippet.createdAt,
                    updatedAt: snippet.updatedAt
                };
                return this.commonService.generateSuccessResponse([returnData]);
            }
            throw new common_1.HttpException('Snippet text not found', common_1.HttpStatus.NOT_FOUND);
        }
        catch (error) {
            throw new common_1.HttpException(error, error.status);
        }
    }
    async deleteSnippet(id) {
        try {
            const snippet = await this.snippetModel.findByIdAndDelete(id).exec();
            if (snippet != null) {
                await this.snippetCategoryModel.updateOne({ '_id': snippet.category }, { $pull: { snippets: snippet.id } });
                const res = {
                    message: `${snippet.name} has been deleted successfully`
                };
                return this.commonService.generateSuccessResponse([res]);
            }
            throw new common_1.HttpException('Snippet text not found', common_1.HttpStatus.NOT_FOUND);
        }
        catch (error) {
            throw new common_1.HttpException(error, error.status);
        }
    }
};
SnippetService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Snippet_Category')),
    __param(1, (0, mongoose_1.InjectModel)('Snippet')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        common_service_1.CommonService])
], SnippetService);
exports.SnippetService = SnippetService;
//# sourceMappingURL=snippet.service.js.map