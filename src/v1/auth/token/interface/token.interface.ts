import { Date, Document, Types } from "mongoose";
import { User } from "src/v1/user/interface";

export interface Token extends Document {
    readonly id: string | Types.ObjectId
    readonly userId: string | Types.ObjectId | User
    readonly token: string
    readonly creationAt: Date
}