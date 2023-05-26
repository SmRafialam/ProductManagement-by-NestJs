import * as mongoose from 'mongoose';
export declare const mediaCategorySchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    media: mongoose.Types.ObjectId[];
    description: string;
}>;
export declare const mediaSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    category: mongoose.Types.ObjectId;
    description: string;
    quantity: {
        min: number;
        max: number;
    };
    extensions: {
        image: string[];
        video: string[];
        document: string[];
    };
    sizeLimit: {
        image: {
            type: ObjectConstructor;
            default: any;
        };
        video: {
            type: ObjectConstructor;
            default: any;
        };
        document: {
            type: ObjectConstructor;
            default: any;
        };
    };
}>;
