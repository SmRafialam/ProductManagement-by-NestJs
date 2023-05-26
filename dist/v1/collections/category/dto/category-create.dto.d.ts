export declare class CategoryCreateDto {
    name: string;
    shortText: string;
    longText: string;
    media: object[];
    parent: string;
    subCategories: CategoryCreateDto[];
}
