import * as mongoose from 'mongoose'

export const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        required: true
    }
}, {timestamps: true})