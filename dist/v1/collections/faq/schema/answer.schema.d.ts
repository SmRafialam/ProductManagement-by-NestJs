import * as mongoose from 'mongoose';
export declare const answer: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.ResolveSchemaOptions<{
    _id: false;
}>, {
    answer: string;
    products: mongoose.Types.ObjectId[];
}>;
