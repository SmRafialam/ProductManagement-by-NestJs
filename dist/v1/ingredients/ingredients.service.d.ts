import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { Model } from 'mongoose';
import { Ingredients } from './interface/ingredient.interface';
import { CommonService } from 'src/common/common.service';
export declare class IngredientsService {
    private ingredientModel;
    private readonly commonService;
    constructor(ingredientModel: Model<Ingredients>, commonService: CommonService);
    createIngredient(ingredientData: CreateIngredientDto): Promise<{
        isSuccess: boolean;
        result: Ingredients;
    }>;
    getIngredientList(): Promise<{
        isSuccess: boolean;
        result: Ingredients[];
    }>;
    getIngredientById(ingredientId: string): Promise<{
        isSuccess: boolean;
        result: Ingredients[];
    }>;
    updateIngredient(ingredientId: string, ingredientData: UpdateIngredientDto): Promise<{
        isSuccess: boolean;
        result: Ingredients;
    }>;
    deleteIngredient(ingredientId: string): Promise<{
        isSuccess: boolean;
        result: {
            message: string;
        }[];
    }>;
}
