import { Model } from 'mongoose';
import { CommonService } from 'src/common/common.service';
import { FaqCategoryDto, FaqCreateDto, FaqUpdateDto } from './dto';
import { Faq, FaqCategory } from './interface';
export declare class FaqService {
    private faqCategoryModel;
    private faqModel;
    private readonly commonService;
    constructor(faqCategoryModel: Model<FaqCategory>, faqModel: Model<Faq>, commonService: CommonService);
    getFaqDetail(): Promise<{
        isSuccess: boolean;
        result: FaqCategory[];
    }>;
    getCategoryList(): Promise<{
        isSuccess: boolean;
        result: FaqCategory[];
    }>;
    addFaqCategory(data: FaqCategoryDto): Promise<{
        isSuccess: boolean;
        result: FaqCategory[];
    }>;
    editFaqCategory(faqCatId: string, updateData: FaqCategoryDto): Promise<{
        isSuccess: boolean;
        result: FaqCategory[];
    }>;
    deleteFaqCategory(faqCatId: string): Promise<{
        isSuccess: boolean;
        result: {
            message: string;
        }[];
    }>;
    getFaqList(): Promise<{
        isSuccess: boolean;
        result: Faq[];
    }>;
    addFaq(data: FaqCreateDto): Promise<{
        isSuccess: boolean;
        result: Faq[];
    }>;
    editFaq(questionId: string, updateData: FaqUpdateDto): Promise<{
        isSuccess: boolean;
        result: Faq[];
    }>;
    deleteFaq(questionId: string): Promise<{
        isSuccess: boolean;
        result: {
            message: string;
        }[];
    }>;
}
