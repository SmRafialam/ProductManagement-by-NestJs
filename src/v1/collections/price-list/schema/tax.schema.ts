import * as mongoose from 'mongoose'

export const taxSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        lowercase: true
    },
    amount: {
        type: Number
    },
    evaluateIn: {
        type: String,
        trim: true,
        lowercase: true,
    }
}, {_id: false})