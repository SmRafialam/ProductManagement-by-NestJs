import * as mongoose from 'mongoose';
export declare const collectionRole: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.ResolveSchemaOptions<{
    _id: false;
}>, {
    tags: string;
    faq: string;
    teams: string;
    sellingChannels: string;
    formula: string;
    reviews: string;
    categories: string;
    attributes: string;
    mediaCategories: string;
    metadata: string;
    textSnippets: string;
    taxesFees: string;
}>;
export declare const productRole: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.ResolveSchemaOptions<{
    _id: false;
}>, {
    create: boolean;
    view: boolean;
    manageCollaborators: boolean;
    publishUnpublish: boolean;
    archiveDelete: boolean;
    segments: {
        faq: string;
        media: string;
        content: string;
        generalSettings: string;
        productAttributes: string;
        pricing: string;
        delivery: string;
        sellingChannels: string;
        seo: string;
        formula: string;
        reviews: string;
        translations: string;
    };
}>;
