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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const common_service_1 = require("../../common/common.service");
let ProductService = class ProductService {
    constructor(productModel, reviewModel, commonService) {
        this.productModel = productModel;
        this.reviewModel = reviewModel;
        this.commonService = commonService;
    }
    async getProductList() {
        try {
            const products = await this.productModel.find().sort({ name: 1 }).exec();
            const returnData = products.map(product => ({
                id: product.id,
                name: product.name,
                slug: product.slug,
                sku: product.sku,
                category: product.category,
                tag: product.tag,
                image: product.image,
                users: product.users,
                teams: product.teams,
                reviews: product.reviews,
                createdAt: product.createdAt,
                updatedAt: product.updatedAt
            }));
            return this.commonService.generateSuccessResponse(returnData);
        }
        catch (error) {
            throw new common_1.HttpException(error, error === null || error === void 0 ? void 0 : error.status);
        }
    }
    async addProduct(data) {
        try {
            const newProduct = new this.productModel(Object.assign({}, data));
            const product = await newProduct.save();
            const returnData = {
                id: product.id,
                name: product.name,
                slug: product.slug,
                sku: product.sku,
                category: product.category,
                tag: product.tag,
                image: product.image,
                users: product.users,
                teams: product.teams,
                reviews: product.reviews,
                createdAt: product.createdAt,
                updatedAt: product.updatedAt
            };
            return this.commonService.generateSuccessResponse([returnData]);
        }
        catch (error) {
            throw new common_1.HttpException(error, error === null || error === void 0 ? void 0 : error.status);
        }
    }
    async getProductById(id) {
        try {
            const product = await this.productModel.findById(id).exec();
            if (product != null) {
                const returnData = {
                    id: product.id,
                    name: product.name,
                    slug: product.slug,
                    sku: product.sku,
                    category: product.category,
                    tag: product.tag,
                    image: product.image,
                    users: product.users,
                    teams: product.teams,
                    reviews: product.reviews,
                    createdAt: product.createdAt,
                    updatedAt: product.updatedAt
                };
                return this.commonService.generateSuccessResponse([returnData]);
            }
            throw new common_1.HttpException('Product not found', common_1.HttpStatus.NOT_FOUND);
        }
        catch (error) {
            throw new common_1.HttpException(error, error === null || error === void 0 ? void 0 : error.status);
        }
    }
    async updateProduct(id, updateData) {
        try {
            const product = await this.productModel.findByIdAndUpdate(id, Object.assign({}, updateData), { new: true }).exec();
            if (product != null) {
                const returnData = {
                    id: product.id,
                    name: product.name,
                    slug: product.slug,
                    sku: product.sku,
                    category: product.category,
                    tag: product.tag,
                    image: product.image,
                    users: product.users,
                    teams: product.teams,
                    reviews: product.reviews,
                    createdAt: product.createdAt,
                    updatedAt: product.updatedAt
                };
                return this.commonService.generateSuccessResponse([returnData]);
            }
            throw new common_1.HttpException('Product not found', common_1.HttpStatus.NOT_FOUND);
        }
        catch (error) {
            throw new common_1.HttpException(error, error === null || error === void 0 ? void 0 : error.status);
        }
    }
    async deleteProduct(id) {
        try {
            const product = await this.productModel.findByIdAndDelete(id).exec();
            if (product != null) {
                await this.reviewModel.updateMany({ '_id': product.reviews }, { $pull: { products: product.id } });
                const res = {
                    message: `${product.name} product has been deleted successfully`
                };
                return this.commonService.generateSuccessResponse([res]);
            }
            throw new common_1.HttpException('Product not found', common_1.HttpStatus.NOT_FOUND);
        }
        catch (error) {
            throw new common_1.HttpException(error, error === null || error === void 0 ? void 0 : error.status);
        }
    }
};
ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Product')),
    __param(1, (0, mongoose_1.InjectModel)('Review')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        common_service_1.CommonService])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map