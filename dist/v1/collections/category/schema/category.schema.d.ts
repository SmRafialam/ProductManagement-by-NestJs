import * as mongoose from 'mongoose';
export declare const categorySchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    media: any[];
    slug: string;
    shortText: string;
    longText: string;
    parent: mongoose.Types.ObjectId;
}>;
