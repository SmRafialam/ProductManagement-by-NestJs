import { Document, Types } from "mongoose";

export interface MediaCategory extends Document {
    readonly id: string | Types.ObjectId
    readonly name: string
    readonly description: string
    readonly media: string[] | Types.ObjectId[] | Media[]
    readonly createdAt: string
    readonly updatedAt: string
}

export interface Media extends Document {
    readonly id: string | Types.ObjectId
    readonly name: string
    readonly description: string
    readonly category: string | Types.ObjectId | MediaCategory
    readonly extensions: {image: string[], video: string[], document: string[]}
    readonly sizeLimit: {image: object, video: object, document: object}
    readonly quantity: {min: number, max: number}
    readonly createdAt: string
    readonly updatedAt: string
}