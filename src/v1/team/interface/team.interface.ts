import { Document, Types } from "mongoose";
import { Product } from "src/v1/product/interface";
import { User } from "src/v1/user/interface";

export interface Team extends Document {
    readonly id: string | Types.ObjectId
    readonly name: string
    readonly users: string[] | Types.ObjectId[] | User[]
    readonly products: string[] | Types.ObjectId[] | Product[]
    readonly createdAt: string
    readonly updatedAt: string
} 