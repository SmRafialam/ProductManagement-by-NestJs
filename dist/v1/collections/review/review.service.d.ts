import { Model } from 'mongoose';
import { CommonService } from 'src/common/common.service';
import { Product } from 'src/v1/product/interface';
import { ReviewDto } from './dto';
import { Review } from './interface';
export declare class ReviewService {
    private reviewModel;
    private productModel;
    private readonly commonService;
    constructor(reviewModel: Model<Review>, productModel: Model<Product>, commonService: CommonService);
    getReviewList(): Promise<{
        isSuccess: boolean;
        result: Review[];
    }>;
    addReview(data: ReviewDto): Promise<{
        isSuccess: boolean;
        result: Review[];
    }>;
    getReviewById(id: string): Promise<{
        isSuccess: boolean;
        result: Review[];
    }>;
    updateReview(id: string, updateData: ReviewDto): Promise<{
        isSuccess: boolean;
        result: Review[];
    }>;
    deleteReview(id: string): Promise<{
        isSuccess: boolean;
        result: {
            message: string;
        }[];
    }>;
}
