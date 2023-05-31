import { IngredientsService } from './ingredients.service';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
export declare class IngredientsController {
    private readonly ingredientsService;
    constructor(ingredientsService: IngredientsService);
    create(createIngredientDto: CreateIngredientDto): Promise<{
        isSuccess: boolean;
        result: import("./interface/ingredient.interface").Ingredients;
    }>;
    findAll(): Promise<{
        isSuccess: boolean;
        result: import("./interface/ingredient.interface").Ingredients[];
    }>;
    findOne(id: string): Promise<{
        isSuccess: boolean;
        result: import("./interface/ingredient.interface").Ingredients[];
    }>;
    update(id: string, updateIngredientDto: UpdateIngredientDto): Promise<{
        isSuccess: boolean;
        result: import("./interface/ingredient.interface").Ingredients;
    }>;
    remove(id: string): Promise<{
        isSuccess: boolean;
        result: {
            message: string;
        }[];
    }>;
}
