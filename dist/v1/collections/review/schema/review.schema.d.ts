import * as mongoose from 'mongoose';
export declare const reviewSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    avatar: any;
    products: mongoose.Types.ObjectId[];
    occupation: string;
    location: string;
    rating: number;
    shortReview: string;
    longReview: string;
    images: any[];
}>;
