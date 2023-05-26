import * as mongoose from 'mongoose';
export declare const mediaExtension: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.ResolveSchemaOptions<{
    _id: false;
}>, {
    image: string[];
    video: string[];
    document: string[];
}>;
export declare const mediaSizeLimit: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.ResolveSchemaOptions<{
    _id: false;
}>, {
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
}>;
export declare const mediaQuantity: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.ResolveSchemaOptions<{
    _id: false;
}>, {
    min: number;
    max: number;
}>;
