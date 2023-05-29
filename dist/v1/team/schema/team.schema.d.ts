import * as mongoose from 'mongoose';
export declare const teamSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    users: mongoose.Types.ObjectId[];
    products: mongoose.Types.ObjectId[];
}>;
