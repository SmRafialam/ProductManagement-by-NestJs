import { Model } from 'mongoose';
import { CommonService } from 'src/common/common.service';
import { SnippetCategoryDto, SnippetCreateDto, SnippetUpdateDto } from './dto';
import { Snippet, SnippetCategory } from './interface';
export declare class SnippetService {
    private snippetCategoryModel;
    private snippetModel;
    private readonly commonService;
    constructor(snippetCategoryModel: Model<SnippetCategory>, snippetModel: Model<Snippet>, commonService: CommonService);
    getCategoryList(): Promise<{
        isSuccess: boolean;
        result: SnippetCategory[];
    }>;
    addCategory(data: SnippetCategoryDto): Promise<{
        isSuccess: boolean;
        result: SnippetCategory[];
    }>;
    updateCategory(id: string, updateData: SnippetCategoryDto): Promise<{
        isSuccess: boolean;
        result: SnippetCategory[];
    }>;
    deleteCategory(id: string): Promise<{
        isSuccess: boolean;
        result: {
            message: string;
        }[];
    }>;
    getSnippetList(): Promise<{
        isSuccess: boolean;
        result: Snippet[];
    }>;
    addSnippet(data: SnippetCreateDto): Promise<{
        isSuccess: boolean;
        result: Snippet[];
    }>;
    updateSnippet(id: string, updateData: SnippetUpdateDto): Promise<{
        isSuccess: boolean;
        result: Snippet[];
    }>;
    deleteSnippet(id: string): Promise<{
        isSuccess: boolean;
        result: {
            message: string;
        }[];
    }>;
}
