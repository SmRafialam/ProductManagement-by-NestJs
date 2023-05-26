import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommonService } from 'src/common/common.service';
import { Product } from 'src/v1/product/interface';
import { ReviewDto } from './dto';
import { Review } from './interface';

@Injectable()
export class ReviewService {
    constructor(
        @InjectModel('Review') private reviewModel: Model<Review>,
        @InjectModel('Product') private productModel: Model<Product>,
        private readonly commonService: CommonService
    ) {}

    async getReviewList(): Promise<{isSuccess: boolean, result: Review[]}> {
        try {
            const reviews = await this.reviewModel.find().sort({updatedAt: 1}).exec()
            const returnData = reviews.map(review=> ({
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
            })) as Review[];
            return this.commonService.generateSuccessResponse<Review[]>(returnData);
        }catch(error) {
            throw new HttpException(error, error?.status)
        }
    }

    async addReview(data: ReviewDto): Promise<{isSuccess: boolean, result: Review[]}> {
        try {
            const newReview = new this.reviewModel({
                ...data
            })
            const review = await newReview.save();
            await this.productModel.updateMany({'_id': data.products}, {$push: {reviews: review.id}});
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
            } as Review;
            return this.commonService.generateSuccessResponse<Review[]>([returnData]);
        }catch(error){
            throw new HttpException(error, error?.status)
        }
    }

    async getReviewById(id: string): Promise<{isSuccess: boolean, result: Review[]}> {
        try {
            const review = await this.reviewModel.findById(id).exec();
            if(review != null) {
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
                } as Review;
                return this.commonService.generateSuccessResponse<Review[]>([returnData]);
            }
            throw new HttpException('Review not found', HttpStatus.NOT_FOUND)
        }catch(error){
            throw new HttpException(error, error?.status)
        }
    }

    async updateReview(id: string, updateData: ReviewDto): Promise<{isSuccess: boolean, result: Review[]}> {
        try {
            const data = await this.reviewModel.findById(id).exec();
            const prevProductIds = data.products.map(product=>product.toString());
            const newProductIds= updateData.products || null;
            if(data != null) {
                const review = await this.reviewModel.findByIdAndUpdate(id, {
                    ...updateData
                }, {new: true}).exec();
                if(Array.isArray(newProductIds)) {
                    const {add, remove} = await this.commonService.changeable_ids(newProductIds, prevProductIds);
                    if(add.length) await this.productModel.updateMany({'_id': add}, {$addToSet: {reviews: review.id}});
                    if(remove.length) await this.productModel.updateMany({'_id': remove}, {$pull: {reviews: review.id}});
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
                } as Review;
                return this.commonService.generateSuccessResponse<Review[]>([returnData]);
            }
            throw new HttpException('Review not found', HttpStatus.NOT_FOUND);
        }catch(error) {
            throw new HttpException(error, error?.status);
        }
    }

    async deleteReview(id: string): Promise<{isSuccess: boolean, result: {message: string}[]}> {
        try {
            const review = await this.reviewModel.findByIdAndDelete(id).exec();
            if(review != null) {
                await this.productModel.updateMany({'_id': review.products}, {$pull: {reviews: review.id}});
                const res = {
                    message: `${review.name} review has been deleted successfully`
                };
                return this.commonService.generateSuccessResponse<{message: string}[]>([res]);
            }
            throw new HttpException('Review not found', HttpStatus.NOT_FOUND);
        }catch(error) {
            throw new HttpException(error, error?.status);
        }
    }
}
