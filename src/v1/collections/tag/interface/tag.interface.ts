import { Document, Types } from "mongoose"

export interface Tag extends Document {
    readonly id: string | Types.ObjectId
    readonly name: string
    readonly createdAt: string
    readonly updatedAt: string
}