import * as mongoose from 'mongoose';
export declare const featureSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    description: string;
    title: string;
    image: string;
    icon: string;
}>;
