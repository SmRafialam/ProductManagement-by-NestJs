import * as mongoose from 'mongoose'

export const featureSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },

    image: {
        type: String,
        default: ''
    },

    icon: {
        type: String,
        default: ''
    },

    description: {
        type: String,
        default: ''
    }
    
}, {timestamps: true})
