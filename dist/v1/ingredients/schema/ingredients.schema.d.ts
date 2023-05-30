import * as mongoose from 'mongoose';
declare enum IngredientUnit {
    GM = "gram",
    KG = "kilogram",
    MG = "milligram",
    LT = "liter",
    ML = "milliliter"
}
export declare const ingredientSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    title: string;
    description: string;
    showDescription: boolean;
    image: string;
    icon: string;
    subIngredients: mongoose.Types.ObjectId[];
    dailyValue?: {
        ingredientValue: number;
        ingredientUnit: IngredientUnit;
        hasDailyValue: boolean;
    };
}>;
export {};
