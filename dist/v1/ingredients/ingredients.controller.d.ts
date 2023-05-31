import { IngredientsService } from './ingredients.service';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { Ingredients } from './interface/ingredient.interface';
export declare class IngredientsController {
    private readonly ingredientsService;
    constructor(ingredientsService: IngredientsService);
    create(createIngredientDto: CreateIngredientDto): Promise<{
        isSuccess: boolean;
        result: Ingredients;
    }>;
    createBulkIngredients(ingredientTitles: string[]): Promise<{
        isSuccess: boolean;
        result: Ingredients[];
    }>;
    findAll(): Promise<{
        isSuccess: boolean;
        result: Ingredients[];
    }>;
    findOne(id: string): Promise<{
        isSuccess: boolean;
        result: Ingredients[];
    }>;
    update(id: string, updateIngredientDto: UpdateIngredientDto): Promise<{
        isSuccess: boolean;
        result: Ingredients;
    }>;
    remove(id: string): Promise<{
        isSuccess: boolean;
        result: {
            message: string;
        }[];
    }>;
}
