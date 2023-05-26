import { Document, Types } from "mongoose";
import { Attribute } from "../../interface";

export interface Choice extends Document {
    readonly id: string | Types.ObjectId
    readonly name: string
    readonly suffix: string
    readonly attribute: string | Types.ObjectId | Attribute
    readonly createdAt: string
    readonly updatedAt: string
}