import * as mongoose from 'mongoose'
import { Availability } from "../enum/availability.enum"

const segmentRole = new mongoose.Schema({
    generalSettings: {
        type: String,
        enum: Availability,
        default: Availability.viewer
    },
    productAttributes: {
        type: String,
        enum: Availability,
        default: Availability.viewer
    },
    pricing: {
        type: String,
        enum: Availability,
        default: Availability.viewer
    },
    delivery: {
        type: String,
        enum: Availability,
        default: Availability.viewer
    },
    sellingChannels: {
        type: String,
        enum: Availability,
        default: Availability.viewer
    },
    seo: {
        type: String,
        enum: Availability,
        default: Availability.viewer
    },
    media: {
        type: String,
        enum: Availability,
        default: Availability.viewer
    },
    content: {
        type: String,
        enum: Availability,
        default: Availability.viewer
    },
    formula: {
        type: String,
        enum: Availability,
        default: Availability.viewer
    },
    faq: {
        type: String,
        enum: Availability,
        default: Availability.viewer
    },
    reviews: {
        type: String,
        enum: Availability,
        default: Availability.viewer
    },
    translations: {
        type: String,
        enum: Availability,
        default: Availability.viewer
    }
}, { _id : false })

export const collectionRole = new mongoose.Schema({
    categories: {
        type: String,
        enum: Availability,
        default: Availability.viewer
    },
    attributes: {
        type: String,
        enum: Availability,
        default: Availability.viewer
    },
    mediaCategories: {
        type: String,
        enum: Availability,
        default: Availability.viewer
    },
    formula: {
        type: String,
        enum: Availability,
        default: Availability.viewer
    },
    tags: {
        type: String,
        enum: Availability,
        default: Availability.viewer
    },
    metadata: {
        type: String,
        enum: Availability,
        default: Availability.viewer
    },
    textSnippets: {
        type: String,
        enum: Availability,
        default: Availability.viewer
    },
    sellingChannels: {
        type: String,
        enum: Availability,
        default: Availability.viewer
    },
    taxesFees: {
        type: String,
        enum: Availability,
        default: Availability.viewer
    },
    teams: {
        type: String,
        enum: Availability,
        default: Availability.viewer
    },
    reviews: {
        type: String,
        enum: Availability,
        default: Availability.viewer
    },
    faq: {
        type: String,
        enum: Availability,
        default: Availability.viewer
    }
}, { _id : false })

export const productRole = new mongoose.Schema({
    view: {
        type: Boolean,
        default: false
    },
    create : {
        type: Boolean,
        default: false
    },
    manageCollaborators: {
        type: Boolean,
        default: false
    },
    publishUnpublish: {
        type: Boolean,
        default: false
    },
    archiveDelete: {
        type: Boolean,
        default: false
    },
    segments: {
        type: segmentRole,
        default: () => ({})
    }
}, { _id : false })
