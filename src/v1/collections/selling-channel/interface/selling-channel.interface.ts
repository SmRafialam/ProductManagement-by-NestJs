import { Document, Types } from "mongoose";

export interface SellingChannel extends Document {
    readonly id: string | Types.ObjectId
    readonly name: string
    readonly destination: {platform: string, source: string}
    readonly country: string
    readonly priceList: string | Types.ObjectId
    readonly screens: string[]
    readonly createdAt: string
    readonly updatedAt: string
}