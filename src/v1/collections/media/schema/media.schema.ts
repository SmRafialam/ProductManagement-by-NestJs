import * as mongoose from 'mongoose'
import { mediaExtension, mediaQuantity, mediaSizeLimit } from './custom-type.schema'

export const mediaCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        default: ''
    },
    media: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Media',
        default: []
    }
}, {timestamps: true})

export const mediaSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        default: ''
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Media_Category',
        default: null
    },
    extensions: {
        type: mediaExtension,
        default: () => ({})
    },
    sizeLimit: {
        type: mediaSizeLimit,
        default: () => ({})
    },
    quantity: {
        type: mediaQuantity,
        default: () => ({})
    }
}, {timestamps: true})