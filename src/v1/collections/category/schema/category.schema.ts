import * as mongoose from 'mongoose'

export const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    slug: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    shortText: {
        type: String,
        trim: true,
        default: ''
    },
    longText: {
        type: String,
        trim: true,
        default: ''
    },
    media: {
        type: [Object],
        default: []
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        default: null
    }
}, {timestamps: true})