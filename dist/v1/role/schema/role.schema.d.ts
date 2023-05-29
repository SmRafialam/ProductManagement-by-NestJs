import * as mongoose from 'mongoose';
export declare const roleSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    users: mongoose.Types.ObjectId[];
    products: {
        view: boolean;
        create: boolean;
        manageCollaborators: boolean;
        publishUnpublish: boolean;
        archiveDelete: boolean;
        segments: {
            generalSettings: string;
            productAttributes: string;
            pricing: string;
            delivery: string;
            sellingChannels: string;
            seo: string;
            media: string;
            content: string;
            formula: string;
            faq: string;
            reviews: string;
            translations: string;
        };
    };
    systemAdmin: boolean;
    dashboard: boolean;
    collections: {
        teams: string;
        sellingChannels: string;
        formula: string;
        faq: string;
        reviews: string;
        categories: string;
        attributes: string;
        mediaCategories: string;
        tags: string;
        metadata: string;
        textSnippets: string;
        taxesFees: string;
    };
    priceList: boolean;
}>;
