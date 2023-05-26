import * as mongoose from 'mongoose'

export const choiceSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    suffix: {
        type: String,
        trim: true,
        default: ''
    },
    attribute: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Attribute',
        required: true
    }
}, {timestamps: true})