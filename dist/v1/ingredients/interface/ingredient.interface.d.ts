import { Document } from "mongoose";
export interface Ingredients extends Document {
    title: string;
    dailyValue: DailyValue;
    description: string;
    showDescription: boolean;
    image: string;
    icon: string;
}
export interface DailyValue {
    ingredientValue?: number;
    ingredientUnit?: string;
    hasDailyValue?: boolean;
}
