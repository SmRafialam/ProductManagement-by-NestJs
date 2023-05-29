import { Document, Types } from "mongoose";

export interface Ingredients extends Document {
  title: string;
  dailyValue: DailyValue;
  description: string;
  showDescription: boolean;
  image: string;
  icon: string;
  subIngredients: SubIngredient[];
}

export interface DailyValue {
  ingredientValue?: number;
  ingredientUnit?: string;
  hasDailyValue?: boolean;
}

export interface SubIngredient {
  name: string;
}