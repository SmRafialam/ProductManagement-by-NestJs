import * as mongoose from 'mongoose'

export const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    slug: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    sku: {
        type: String,
        trim: true,
        required: true
    },
    category: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Category',
        default: []
    },
    tag: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Tag',
        default: []
    },
    image: {
        type: Object,
        default: null
    },
    users: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        default: []
    },
    teams: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Team',
        default: []
    },
    reviews: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Review',
        default: []
    }
}, {timestamps: true})