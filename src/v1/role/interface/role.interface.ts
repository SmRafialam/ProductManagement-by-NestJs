import { Document, Types } from "mongoose";
import { User } from "src/v1/user/interface";
import { CollectionRole, ProductRole } from "../type";

export interface Role extends Document {
    readonly id: string | Types.ObjectId
    readonly name: string
    readonly systemAdmin: boolean
    readonly dashboard: boolean
    readonly products: ProductRole
    readonly collections: CollectionRole
    readonly priceList: boolean
    readonly users: string[] | Types.ObjectId[] | User[]
    readonly createdAt: string
    readonly updatedAt: string
}