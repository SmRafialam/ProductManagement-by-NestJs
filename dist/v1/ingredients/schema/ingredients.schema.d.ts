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
    description: string;
    image: string;
    title: string;
    showDescription: boolean;
    icon: string;
    dailyValue?: {
        ingredientValue: number;
        ingredientUnit: IngredientUnit;
        hasDailyValue: boolean;
    };
}>;
export {};
