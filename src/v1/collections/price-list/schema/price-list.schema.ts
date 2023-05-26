import * as mongoose from 'mongoose'

export const proceListSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    currency: {
        type: String,
        trim: true,
        lowercase: true,
        required: true
    },
    taxes: [{
        name: {
            type: String,
            trim: true,
            lowercase: true,
        },
        amount: {
            type: Number
        },
        evaluateIn: {
            type: String,
            trim: true,
            lowercase: true,
        }
    }]
}, {timestamps: true})