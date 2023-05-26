import { CategoryService } from './category.service';
import { CategoryCreateDto, CategoryUpdateDto } from './dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    getCategoryList(): Promise<{
        isSuccess: boolean;
        result: import("./interface").Category[];
    }>;
    addCategory(categoryCreateDto: CategoryCreateDto): Promise<{
        isSuccess: boolean;
        result: import("./interface").Category[];
    }>;
    getCategoryById(teamId: string): Promise<{
        isSuccess: boolean;
        result: import("./interface").Category[];
    }>;
    updateCategory(teamId: string, categoryUpdateDto: CategoryUpdateDto): Promise<{
        isSuccess: boolean;
        result: import("./interface").Category[];
    }>;
    deleteCategory(teamId: string): Promise<{
        isSuccess: boolean;
        result: {
            message: string;
        }[];
    }>;
}
