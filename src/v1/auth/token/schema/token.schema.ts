import * as mongoose from 'mongoose'

export const tokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    token: {
        type: String,
        required: true
    },
    creationAt: {
        type: Date,
        default: Date.now,
        expires : 86400
    }
})