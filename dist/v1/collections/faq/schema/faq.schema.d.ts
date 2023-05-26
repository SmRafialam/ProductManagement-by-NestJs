import * as mongoose from 'mongoose';
export declare const faqSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    category: mongoose.Types.ObjectId;
    note: string;
    question: string;
    answers: {
        answer: string;
        products: mongoose.Types.ObjectId[];
        _id?: unknown;
    }[];
}>;
