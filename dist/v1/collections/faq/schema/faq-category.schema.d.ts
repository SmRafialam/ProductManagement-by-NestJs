import * as mongoose from 'mongoose';
export declare const faqCategorySchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    note: string;
    faqs: mongoose.Types.ObjectId[];
}>;
