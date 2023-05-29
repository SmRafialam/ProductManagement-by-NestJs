import * as mongoose from 'mongoose';
export declare const productSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    teams: mongoose.Types.ObjectId[];
    users: mongoose.Types.ObjectId[];
    reviews: mongoose.Types.ObjectId[];
    slug: string;
    category: mongoose.Types.ObjectId[];
    image: any;
    sku: string;
    tag: mongoose.Types.ObjectId[];
}>;
