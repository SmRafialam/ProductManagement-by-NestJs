import * as mongoose from 'mongoose';
export declare const proceListSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    currency: string;
    taxes: {
        name?: string;
        amount?: number;
        evaluateIn?: string;
    }[];
}>;
