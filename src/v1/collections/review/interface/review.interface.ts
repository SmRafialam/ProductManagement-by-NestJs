import { Document, Types } from "mongoose";

export interface Review extends Document {
    readonly id: string | Types.ObjectId
    readonly name: string
    readonly occupation: string
    readonly avatar: object
    readonly location: string
    readonly rating: number
    readonly shortReview: string
    readonly longReview: string
    readonly images : object[]
    readonly products: Types.ObjectId[]
    readonly createdAt: string
    readonly updatedAt: string
}