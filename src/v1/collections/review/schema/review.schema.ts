import * as mongoose from 'mongoose'

export const reviewSchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        required: true
    },
    occupation: {
        type: String,
        trim: true,
        default: ''
    },
    avatar: {
        type: Object,
        default: null
    },
    location: {
        type: String,
        trim: true,
        default: ''
    },
    rating: {
        type: Number,
        required: true
    },
    shortReview: {
        type: String,
        trim: true,
        default: ''
    },
    longReview: {
        type: String,
        trim: true,
        default: ''
    },
    images: {
        type: [Object],
        default: []
    },
    products: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Product',
        default: []
    }
}, {timestamps: true})