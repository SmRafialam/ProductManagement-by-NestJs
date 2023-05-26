import * as mongoose from 'mongoose';
export declare const userSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    role: mongoose.Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    superAdmin: boolean;
    teams: mongoose.Types.ObjectId[];
    avatar: string;
    refreshToken: string;
    status: string;
    password?: string;
}>;
