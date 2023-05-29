import * as mongoose from 'mongoose';
export declare const snippetCategorySchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    snippets: mongoose.Types.ObjectId[];
}>;
export declare const snippetSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    text: string;
    name: string;
    category: mongoose.Types.ObjectId;
    snippetId: string;
}>;
