import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommonService } from 'src/common/common.service';
import { Review } from '../collections/review/interface';
import { ProductDto } from './dto';
import { Product } from './interface';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel('Product') private productModel: Model<Product>,
        @InjectModel('Review') private reviewModel: Model<Review>,
        private readonly commonService: CommonService
    ) {}

    async getProductList(): Promise<{isSuccess: boolean, result: Product[]}> {
        try {
            const products = await this.productModel.find().sort({name: 1}).exec()
            const returnData = products.map(product=> ({
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
            })) as Product[];
            return this.commonService.generateSuccessResponse<Product[]>(returnData);
        }catch(error) {
            throw new HttpException(error, error?.status)
        }

    }

    async addProduct(data: ProductDto): Promise<{isSuccess: boolean, result: Product[]}> {
        try {
            const newProduct = new this.productModel({
                ...data
            });
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
            } as Product;
            return this.commonService.generateSuccessResponse<Product[]>([returnData]);
        }catch(error){
            throw new HttpException(error, error?.status)
        }
    }

    async getProductById(id: string): Promise<{isSuccess: boolean, result: Product[]}> {
        try {
            const product = await this.productModel.findById(id).exec()
            if(product != null) {
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
                } as Product
                return this.commonService.generateSuccessResponse<Product[]>([returnData]);
            }
            throw new HttpException('Product not found', HttpStatus.NOT_FOUND)
        }catch(error){
            throw new HttpException(error, error?.status)
        }
    }

    async updateProduct(id: string, updateData: ProductDto): Promise<{isSuccess: boolean, result: Product[]}> {
        try {
            const product = await this.productModel.findByIdAndUpdate(id, {
                ...updateData
            }, {new: true}).exec();
            if(product != null) {
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
                } as Product;
                return this.commonService.generateSuccessResponse<Product[]>([returnData]);
            }
            throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
        }catch(error) {
            throw new HttpException(error, error?.status);
        }
    }

    async deleteProduct(id: string): Promise<{isSuccess: boolean, result: {message: string}[]}> {
        try {
            const product = await this.productModel.findByIdAndDelete(id).exec()
            if(product != null) {
                await this.reviewModel.updateMany({'_id': product.reviews}, {$pull: {products: product.id}});
                const res = {
                    message: `${product.name} product has been deleted successfully`
                };
                return this.commonService.generateSuccessResponse<{message: string}[]>([res]);
            }
            throw new HttpException('Product not found', HttpStatus.NOT_FOUND)
        }catch(error) {
            throw new HttpException(error, error?.status)
        }
    }
}
