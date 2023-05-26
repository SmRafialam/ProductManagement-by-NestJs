export declare class DailyValueDto {
    ingredientValue: number;
    ingredientUnit: string;
    hasDailyValue: boolean;
}
export declare class CreateIngredientDto {
    title: string;
    dailyValue: DailyValueDto;
    description: string;
    showDescription: boolean;
    image: string;
    icon: string;
}
