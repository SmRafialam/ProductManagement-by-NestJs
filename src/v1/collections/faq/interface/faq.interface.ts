import { Document, Types } from "mongoose";

export interface FaqCategory extends Document {
    readonly id: Types.ObjectId
    readonly name: string
    readonly note: string
    readonly faqs: Types.ObjectId[] | Faq[]
    readonly createdAt: string
    readonly updatedAt: string
}

export interface Faq extends Document {
    readonly id: Types.ObjectId
    readonly question: string
    readonly note: string
    readonly answers: {answer: string, products: string[]}[]
    readonly category: Types.ObjectId | FaqCategory
    readonly createdAt: string
    readonly updatedAt: string
}
