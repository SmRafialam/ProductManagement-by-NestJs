import { Document, Types } from "mongoose";
import { Category } from "src/v1/collections/category/interface";
import { Review } from "src/v1/collections/review/interface";
import { Tag } from "src/v1/collections/tag/interface";
import { Team } from "src/v1/team/interface";
import { User } from "src/v1/user/interface";

export interface Product extends Document {
    readonly id: string | Types.ObjectId
    readonly name: string
    readonly slug: string
    readonly sku: string
    readonly category: string[] | Types.ObjectId[] | Category[]
    readonly tag: string[] | Types.ObjectId[] | Tag[]
    readonly image: object
    readonly users: string[] | Types.ObjectId[] | User[]
    readonly teams: string[] | Types.ObjectId[] | Team[]
    readonly reviews: string[] | Types.ObjectId[] | Review[]
    readonly createdAt: string
    readonly updatedAt: string
}