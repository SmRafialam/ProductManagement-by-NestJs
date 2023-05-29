import * as mongoose from 'mongoose';
export declare const collectionRole: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.ResolveSchemaOptions<{
    _id: false;
}>, {
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
}>;
export declare const productRole: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.ResolveSchemaOptions<{
    _id: false;
}>, {
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
}>;
