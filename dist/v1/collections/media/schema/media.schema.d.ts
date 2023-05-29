import * as mongoose from 'mongoose';
export declare const mediaCategorySchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    description: string;
    media: mongoose.Types.ObjectId[];
}>;
export declare const mediaSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    description: string;
    category: mongoose.Types.ObjectId;
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
    quantity: {
        min: number;
        max: number;
    };
}>;
