import * as mongoose from 'mongoose';
export declare const tokenSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    token: string;
    userId: mongoose.Types.ObjectId;
    creationAt: Date;
}>;
