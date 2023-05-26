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
exports.ReviewService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const common_service_1 = require("../../../common/common.service");
let ReviewService = class ReviewService {
    constructor(reviewModel, productModel, commonService) {
        this.reviewModel = reviewModel;
        this.productModel = productModel;
        this.commonService = commonService;
    }
    async getReviewList() {
        try {
            const reviews = await this.reviewModel.find().sort({ updatedAt: 1 }).exec();
            const returnData = reviews.map(review => ({
                id: review.id,
                name: review.name,
                occupation: review.occupation,
                avatar: review.avatar,
                location: review.location,
                rating: review.rating,
                shortReview: review.shortReview,
                longReview: review.longReview,
                images: review.images,
                products: review.products,
                createdAt: review.createdAt,
                updatedAt: review.updatedAt
            }));
            return this.commonService.generateSuccessResponse(returnData);
        }
        catch (error) {
            throw new common_1.HttpException(error, error === null || error === void 0 ? void 0 : error.status);
        }
    }
    async addReview(data) {
        try {
            const newReview = new this.reviewModel(Object.assign({}, data));
            const review = await newReview.save();
            await this.productModel.updateMany({ '_id': data.products }, { $push: { reviews: review.id } });
            const returnData = {
                id: review.id,
                name: review.name,
                occupation: review.occupation,
                avatar: review.avatar,
                location: review.location,
                rating: review.rating,
                shortReview: review.shortReview,
                longReview: review.longReview,
                images: review.images,
                products: review.products,
                createdAt: review.createdAt,
                updatedAt: review.updatedAt
            };
            return this.commonService.generateSuccessResponse([returnData]);
        }
        catch (error) {
            throw new common_1.HttpException(error, error === null || error === void 0 ? void 0 : error.status);
        }
    }
    async getReviewById(id) {
        try {
            const review = await this.reviewModel.findById(id).exec();
            if (review != null) {
                const returnData = {
                    id: review.id,
                    name: review.name,
                    occupation: review.occupation,
                    avatar: review.avatar,
                    location: review.location,
                    rating: review.rating,
                    shortReview: review.shortReview,
                    longReview: review.longReview,
                    images: review.images,
                    products: review.products,
                    createdAt: review.createdAt,
                    updatedAt: review.updatedAt
                };
                return this.commonService.generateSuccessResponse([returnData]);
            }
            throw new common_1.HttpException('Review not found', common_1.HttpStatus.NOT_FOUND);
        }
        catch (error) {
            throw new common_1.HttpException(error, error === null || error === void 0 ? void 0 : error.status);
        }
    }
    async updateReview(id, updateData) {
        try {
            const data = await this.reviewModel.findById(id).exec();
            const prevProductIds = data.products.map(product => product.toString());
            const newProductIds = updateData.products || null;
            if (data != null) {
                const review = await this.reviewModel.findByIdAndUpdate(id, Object.assign({}, updateData), { new: true }).exec();
                if (Array.isArray(newProductIds)) {
                    const { add, remove } = await this.commonService.changeable_ids(newProductIds, prevProductIds);
                    if (add.length)
                        await this.productModel.updateMany({ '_id': add }, { $addToSet: { reviews: review.id } });
                    if (remove.length)
                        await this.productModel.updateMany({ '_id': remove }, { $pull: { reviews: review.id } });
                }
                const returnData = {
                    id: review.id,
                    name: review.name,
                    occupation: review.occupation,
                    avatar: review.avatar,
                    location: review.location,
                    rating: review.rating,
                    shortReview: review.shortReview,
                    longReview: review.longReview,
                    images: review.images,
                    products: review.products,
                    createdAt: review.createdAt,
                    updatedAt: review.updatedAt
                };
                return this.commonService.generateSuccessResponse([returnData]);
            }
            throw new common_1.HttpException('Review not found', common_1.HttpStatus.NOT_FOUND);
        }
        catch (error) {
            throw new common_1.HttpException(error, error === null || error === void 0 ? void 0 : error.status);
        }
    }
    async deleteReview(id) {
        try {
            const review = await this.reviewModel.findByIdAndDelete(id).exec();
            if (review != null) {
                await this.productModel.updateMany({ '_id': review.products }, { $pull: { reviews: review.id } });
                const res = {
                    message: `${review.name} review has been deleted successfully`
                };
                return this.commonService.generateSuccessResponse([res]);
            }
            throw new common_1.HttpException('Review not found', common_1.HttpStatus.NOT_FOUND);
        }
        catch (error) {
            throw new common_1.HttpException(error, error === null || error === void 0 ? void 0 : error.status);
        }
    }
};
ReviewService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Review')),
    __param(1, (0, mongoose_1.InjectModel)('Product')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        common_service_1.CommonService])
], ReviewService);
exports.ReviewService = ReviewService;
//# sourceMappingURL=review.service.js.map