import * as mongoose from 'mongoose';
export declare const taxSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.ResolveSchemaOptions<{
    _id: false;
}>, {
    name?: string;
    amount?: number;
    evaluateIn?: string;
}>;
