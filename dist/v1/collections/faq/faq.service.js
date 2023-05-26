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
exports.FaqService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const common_service_1 = require("../../../common/common.service");
let FaqService = class FaqService {
    constructor(faqCategoryModel, faqModel, commonService) {
        this.faqCategoryModel = faqCategoryModel;
        this.faqModel = faqModel;
        this.commonService = commonService;
    }
    async getFaqDetail() {
        try {
            const faqs = await this.faqCategoryModel.find().populate('faqs').sort({ name: 1 }).exec();
            const returnData = faqs.map(faq => ({
                id: faq.id,
                name: faq.name,
                note: faq.note,
                faqs: faq.faqs.map((faq) => ({
                    id: faq.id,
                    question: faq.question,
                    note: faq.note,
                    answers: faq.answers
                })),
                createdAt: faq.createdAt,
                updatedAt: faq.updatedAt
            }));
            return this.commonService.generateSuccessResponse(returnData);
        }
        catch (error) {
            throw new common_1.HttpException(error, error.status);
        }
    }
    async getCategoryList() {
        try {
            const faqs = await this.faqCategoryModel.find().sort({ name: 1 }).exec();
            const returnData = faqs.map(faq => ({
                id: faq.id,
                name: faq.name,
                note: faq.note,
                faqs: faq.faqs,
                createdAt: faq.createdAt,
                updatedAt: faq.updatedAt
            }));
            return this.commonService.generateSuccessResponse(returnData);
        }
        catch (error) {
            throw new common_1.HttpException(error, error.status);
        }
    }
    async addFaqCategory(data) {
        try {
            const newFaqCat = new this.faqCategoryModel(Object.assign({}, data));
            const faq = await newFaqCat.save();
            const returnData = {
                id: faq.id,
                name: faq.name,
                note: faq.note,
                faqs: faq.faqs,
                createdAt: faq.createdAt,
                updatedAt: faq.updatedAt
            };
            return this.commonService.generateSuccessResponse([returnData]);
        }
        catch (error) {
            throw new common_1.HttpException(error, error.status);
        }
    }
    async editFaqCategory(faqCatId, updateData) {
        try {
            const faq = await this.faqCategoryModel.findByIdAndUpdate(faqCatId, Object.assign({}, updateData), { new: true }).exec();
            if (faq != null) {
                const returnData = {
                    id: faq.id,
                    name: faq.name,
                    note: faq.note,
                    faqs: faq.faqs,
                    createdAt: faq.createdAt,
                    updatedAt: faq.updatedAt
                };
                return this.commonService.generateSuccessResponse([returnData]);
            }
            throw new common_1.HttpException('Faq not found', common_1.HttpStatus.NOT_FOUND);
        }
        catch (error) {
            throw new common_1.HttpException(error, error.status);
        }
    }
    async deleteFaqCategory(faqCatId) {
        try {
            const faq = await this.faqCategoryModel.findByIdAndDelete(faqCatId).exec();
            if (faq != null) {
                const res = {
                    message: `${faq.name} faq category has been deleted successfully`
                };
                return this.commonService.generateSuccessResponse([res]);
            }
            throw new common_1.HttpException('Faq not found', common_1.HttpStatus.NOT_FOUND);
        }
        catch (error) {
            throw new common_1.HttpException(error, error.status);
        }
    }
    async getFaqList() {
        try {
            const faqs = await this.faqModel.find().sort({ question: 1 }).exec();
            const returnData = faqs.map(faq => ({
                id: faq.id,
                question: faq.question,
                note: faq.note,
                answers: faq.answers,
                category: faq.category,
                createdAt: faq.createdAt,
                updatedAt: faq.updatedAt
            }));
            return this.commonService.generateSuccessResponse(returnData);
        }
        catch (error) {
            throw new common_1.HttpException(error, error.status);
        }
    }
    async addFaq(data) {
        try {
            const newFaq = new this.faqModel(Object.assign({}, data));
            const faq = await newFaq.save();
            await this.faqCategoryModel.updateOne({ '_id': data.category }, { $push: { faqs: faq.id } });
            const returnData = {
                id: faq.id,
                question: faq.question,
                note: faq.note,
                answers: faq.answers,
                category: faq.category,
                createdAt: faq.createdAt,
                updatedAt: faq.updatedAt
            };
            return this.commonService.generateSuccessResponse([returnData]);
        }
        catch (error) {
            throw new common_1.HttpException(error, error.status);
        }
    }
    async editFaq(questionId, updateData) {
        try {
            const faq = await this.faqModel.findByIdAndUpdate(questionId, Object.assign({}, updateData), { new: true }).exec();
            if (faq != null) {
                const returnData = {
                    id: faq.id,
                    question: faq.question,
                    note: faq.note,
                    answers: faq.answers,
                    category: faq.category,
                    createdAt: faq.createdAt,
                    updatedAt: faq.updatedAt
                };
                return this.commonService.generateSuccessResponse([returnData]);
            }
            throw new common_1.HttpException('Faq not found', common_1.HttpStatus.NOT_FOUND);
        }
        catch (error) {
            throw new common_1.HttpException(error, error.status);
        }
    }
    async deleteFaq(questionId) {
        try {
            const faq = await this.faqModel.findByIdAndDelete(questionId).exec();
            if (faq != null) {
                await this.faqCategoryModel.updateOne({ '_id': faq.category }, { $pull: { faqs: faq.id } });
                const res = {
                    message: `"${faq.question}" has been deleted successfully`
                };
                return this.commonService.generateSuccessResponse([res]);
            }
            throw new common_1.HttpException('Faq not found', common_1.HttpStatus.NOT_FOUND);
        }
        catch (error) {
            throw new common_1.HttpException(error, error.status);
        }
    }
};
FaqService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Faq_Category')),
    __param(1, (0, mongoose_1.InjectModel)('Faq')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        common_service_1.CommonService])
], FaqService);
exports.FaqService = FaqService;
//# sourceMappingURL=faq.service.js.map