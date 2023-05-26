import * as mongoose from 'mongoose';
export declare const sellingChannelSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    priceList: mongoose.Types.ObjectId;
    destination: {
        platform: string;
        source: string;
    };
    country: string;
    screens: string[];
}>;
