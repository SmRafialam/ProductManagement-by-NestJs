import * as mongoose from 'mongoose'

export const snippetCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    snippets: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Snippet',
        default: []
    }
}, {timestamps: true})

export const snippetSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    snippetId: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Snippet_Category',
        required: true
    },
    text: {
        type: String,
        trim: true,
        required: true
    }
}, {timestamps: true})