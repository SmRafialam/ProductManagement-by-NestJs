import { ReviewDto } from './dto';
import { ReviewService } from './review.service';
export declare class ReviewController {
    private readonly reviewService;
    constructor(reviewService: ReviewService);
    getReviewList(): Promise<{
        isSuccess: boolean;
        result: import("./interface").Review[];
    }>;
    addReview(reviewCreateDto: ReviewDto): Promise<{
        isSuccess: boolean;
        result: import("./interface").Review[];
    }>;
    getReviewById(reviewId: string): Promise<{
        isSuccess: boolean;
        result: import("./interface").Review[];
    }>;
    updateReview(reviewId: string, reviewUpdateDto: ReviewDto): Promise<{
        isSuccess: boolean;
        result: import("./interface").Review[];
    }>;
    deleteReview(reviewId: string): Promise<{
        isSuccess: boolean;
        result: {
            message: string;
        }[];
    }>;
}
