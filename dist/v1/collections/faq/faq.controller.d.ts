import { FaqCategoryDto, FaqCreateDto, FaqUpdateDto } from './dto';
import { FaqService } from './faq.service';
export declare class FaqController {
    private readonly faqService;
    constructor(faqService: FaqService);
    getfaqList(): Promise<{
        isSuccess: boolean;
        result: import("./interface").FaqCategory[];
    }>;
    getCategoryList(): Promise<{
        isSuccess: boolean;
        result: import("./interface").FaqCategory[];
    }>;
    addFaqCategory(faqCatCreateDto: FaqCategoryDto): Promise<{
        isSuccess: boolean;
        result: import("./interface").FaqCategory[];
    }>;
    editFaqCategory(faqCatId: string, faqCatUpdateDto: FaqCategoryDto): Promise<{
        isSuccess: boolean;
        result: import("./interface").FaqCategory[];
    }>;
    deleteFaqCategory(faqCatId: string): Promise<{
        isSuccess: boolean;
        result: {
            message: string;
        }[];
    }>;
    getFaqList(): Promise<{
        isSuccess: boolean;
        result: import("./interface").Faq[];
    }>;
    addFaq(faqCreateDto: FaqCreateDto): Promise<{
        isSuccess: boolean;
        result: import("./interface").Faq[];
    }>;
    editFaq(questionId: string, faqUpdateDto: FaqUpdateDto): Promise<{
        isSuccess: boolean;
        result: import("./interface").Faq[];
    }>;
    deleteFaq(questionId: string): Promise<{
        isSuccess: boolean;
        result: {
            message: string;
        }[];
    }>;
}
