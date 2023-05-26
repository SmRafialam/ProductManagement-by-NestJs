import * as mongoose from 'mongoose';
export declare const productSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    category: mongoose.Types.ObjectId[];
    tag: mongoose.Types.ObjectId[];
    image: any;
    users: mongoose.Types.ObjectId[];
    teams: mongoose.Types.ObjectId[];
    reviews: mongoose.Types.ObjectId[];
    slug: string;
    sku: string;
}>;
