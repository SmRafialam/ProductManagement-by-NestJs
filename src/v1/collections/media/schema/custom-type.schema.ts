import * as mongoose from 'mongoose'

export const mediaExtension = new mongoose.Schema({
    image: {
        type: [String],
        default: []
    },
    video: {
        type: [String],
        default: []
    },
    document: {
        type: [String],
        default: []
    }
}, { _id : false })

export const mediaSizeLimit = new mongoose.Schema({
    image: {
        type: Object,
        default: null
    },
    video: {
        type: Object,
        default: null
    },
    document: {
        type: Object,
        default: null
    }
}, { _id : false })

export const mediaQuantity = new mongoose.Schema({
    min: {
        type: Number,
        default: 1
    },
    max: {
        type: Number,
        default: 10
    }
}, { _id : false })