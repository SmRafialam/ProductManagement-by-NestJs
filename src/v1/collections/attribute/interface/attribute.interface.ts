import { Document, Types } from "mongoose";
import { Choice } from "../choice/interface";

export interface Attribute extends Document {
    readonly id: string | Types.ObjectId
    readonly name: string
    readonly choices: string[] | Types.ObjectId[] | Choice[]
    readonly createdAt: string
    readonly updatedAt: string
}