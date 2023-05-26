import { Model } from 'mongoose';
import { CommonService } from 'src/common/common.service';
import { CategoryCreateDto, CategoryUpdateDto } from './dto';
import { Category } from './interface';
export declare class CategoryService {
    private categoryModel;
    private readonly commonService;
    constructor(categoryModel: Model<Category>, commonService: CommonService);
    addCategory(categoryData: CategoryCreateDto, parentId?: string, list?: any[]): Promise<{
        isSuccess: boolean;
        result: Category[];
    }>;
    getCategoryList(): Promise<{
        isSuccess: boolean;
        result: Category[];
    }>;
    getCategoryById(catId: string): Promise<{
        isSuccess: boolean;
        result: Category[];
    }>;
    updateCategory(catId: string, categoryData: CategoryUpdateDto): Promise<{
        isSuccess: boolean;
        result: Category[];
    }>;
    deleteCategory(catId: string): Promise<{
        isSuccess: boolean;
        result: {
            message: string;
        }[];
    }>;
    getCategoryOrNull(catId: string): Promise<Category>;
}
