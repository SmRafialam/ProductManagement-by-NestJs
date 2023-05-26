import { SnippetCategoryDto, SnippetCreateDto, SnippetUpdateDto } from './dto';
import { SnippetService } from './snippet.service';
export declare class SnippetController {
    private readonly snippetService;
    constructor(snippetService: SnippetService);
    getCategoryList(): Promise<{
        isSuccess: boolean;
        result: import("./interface").SnippetCategory[];
    }>;
    addCategory(catDto: SnippetCategoryDto): Promise<{
        isSuccess: boolean;
        result: import("./interface").SnippetCategory[];
    }>;
    updateCategory(catId: string, catDto: SnippetCategoryDto): Promise<{
        isSuccess: boolean;
        result: import("./interface").SnippetCategory[];
    }>;
    deleteCategory(catId: string): Promise<{
        isSuccess: boolean;
        result: {
            message: string;
        }[];
    }>;
    getSnippetList(): Promise<{
        isSuccess: boolean;
        result: import("./interface").Snippet[];
    }>;
    addSnippet(snippetCreateDto: SnippetCreateDto): Promise<{
        isSuccess: boolean;
        result: import("./interface").Snippet[];
    }>;
    updateSnippet(snippetId: string, snippetUpdateDto: SnippetUpdateDto): Promise<{
        isSuccess: boolean;
        result: import("./interface").Snippet[];
    }>;
    deleteSnippet(snippetId: string): Promise<{
        isSuccess: boolean;
        result: {
            message: string;
        }[];
    }>;
}
