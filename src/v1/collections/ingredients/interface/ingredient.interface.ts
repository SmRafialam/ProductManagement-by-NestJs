import { Document, Types } from "mongoose";
import { SubIngredient } from "./subIngredient.interface";

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

