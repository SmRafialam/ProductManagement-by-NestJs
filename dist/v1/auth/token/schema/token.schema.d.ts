import * as mongoose from 'mongoose';
export declare const tokenSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    userId: mongoose.Types.ObjectId;
    token: string;
    creationAt: Date;
}>;
