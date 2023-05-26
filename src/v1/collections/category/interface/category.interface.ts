import { Document, Types } from "mongoose";

export interface Category extends Document {
    id: string | Types.ObjectId
    readonly name: string
    readonly slug: string
    readonly shortText: string
    readonly longText: string
    readonly media: Object[]
    readonly parent: string | Types.ObjectId | Category
    readonly createdAt: string
    readonly updatedAt: string
} 