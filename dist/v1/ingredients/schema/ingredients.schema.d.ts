import * as mongoose from 'mongoose';
declare enum IngredientUnit {
    gram = "g",
    milligram = "mg"
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
    isSubIngredient: boolean;
    dailyValue?: {
        setDailyValue: boolean;
        dailyValueAmount: number;
        dailyValueUnit: IngredientUnit;
        dailyValueEstablished: boolean;
    };
}>;
export {};
