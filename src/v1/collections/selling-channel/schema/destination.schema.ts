import * as mongoose from 'mongoose'

export const Destination = new mongoose.Schema({
    platform: {
        type: String,
        trim: true,
        required: true
    },
    source: {
        type: String,
        trim: true,
        required: true
    }
}, {_id: false})