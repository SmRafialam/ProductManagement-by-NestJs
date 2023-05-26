import { Document, Types } from "mongoose"

export interface SnippetCategory extends Document {
    readonly id: string
    readonly name: string
    readonly snippets: string[] | Types.ObjectId[] | Snippet[]
    readonly createdAt: string
    readonly updatedAt: string
}

export interface Snippet extends Document {
    readonly id: string
    readonly name: string
    readonly snippetId: string
    readonly category: string | Types.ObjectId | SnippetCategory
    readonly text: string
    readonly createdAt: string
    readonly updatedAt: string
}