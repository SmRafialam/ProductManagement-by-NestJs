import * as mongoose from 'mongoose'

export const answer = new mongoose.Schema({
    answer: {
        type: String,
        trim: true,
        default: ''
    },
    products: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Product',
        default: []
    },
}, { _id : false })