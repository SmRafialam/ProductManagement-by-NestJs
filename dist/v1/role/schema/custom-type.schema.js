"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRole = exports.collectionRole = void 0;
const mongoose = require("mongoose");
const availability_enum_1 = require("../enum/availability.enum");
const segmentRole = new mongoose.Schema({
    generalSettings: {
        type: String,
        enum: availability_enum_1.Availability,
        default: availability_enum_1.Availability.viewer
    },
    productAttributes: {
        type: String,
        enum: availability_enum_1.Availability,
        default: availability_enum_1.Availability.viewer
    },
    pricing: {
        type: String,
        enum: availability_enum_1.Availability,
        default: availability_enum_1.Availability.viewer
    },
    delivery: {
        type: String,
        enum: availability_enum_1.Availability,
        default: availability_enum_1.Availability.viewer
    },
    sellingChannels: {
        type: String,
        enum: availability_enum_1.Availability,
        default: availability_enum_1.Availability.viewer
    },
    seo: {
        type: String,
        enum: availability_enum_1.Availability,
        default: availability_enum_1.Availability.viewer
    },
    media: {
        type: String,
        enum: availability_enum_1.Availability,
        default: availability_enum_1.Availability.viewer
    },
    content: {
        type: String,
        enum: availability_enum_1.Availability,
        default: availability_enum_1.Availability.viewer
    },
    formula: {
        type: String,
        enum: availability_enum_1.Availability,
        default: availability_enum_1.Availability.viewer
    },
    faq: {
        type: String,
        enum: availability_enum_1.Availability,
        default: availability_enum_1.Availability.viewer
    },
    reviews: {
        type: String,
        enum: availability_enum_1.Availability,
        default: availability_enum_1.Availability.viewer
    },
    translations: {
        type: String,
        enum: availability_enum_1.Availability,
        default: availability_enum_1.Availability.viewer
    }
}, { _id: false });
exports.collectionRole = new mongoose.Schema({
    categories: {
        type: String,
        enum: availability_enum_1.Availability,
        default: availability_enum_1.Availability.viewer
    },
    attributes: {
        type: String,
        enum: availability_enum_1.Availability,
        default: availability_enum_1.Availability.viewer
    },
    mediaCategories: {
        type: String,
        enum: availability_enum_1.Availability,
        default: availability_enum_1.Availability.viewer
    },
    formula: {
        type: String,
        enum: availability_enum_1.Availability,
        default: availability_enum_1.Availability.viewer
    },
    tags: {
        type: String,
        enum: availability_enum_1.Availability,
        default: availability_enum_1.Availability.viewer
    },
    metadata: {
        type: String,
        enum: availability_enum_1.Availability,
        default: availability_enum_1.Availability.viewer
    },
    textSnippets: {
        type: String,
        enum: availability_enum_1.Availability,
        default: availability_enum_1.Availability.viewer
    },
    sellingChannels: {
        type: String,
        enum: availability_enum_1.Availability,
        default: availability_enum_1.Availability.viewer
    },
    taxesFees: {
        type: String,
        enum: availability_enum_1.Availability,
        default: availability_enum_1.Availability.viewer
    },
    teams: {
        type: String,
        enum: availability_enum_1.Availability,
        default: availability_enum_1.Availability.viewer
    },
    reviews: {
        type: String,
        enum: availability_enum_1.Availability,
        default: availability_enum_1.Availability.viewer
    },
    faq: {
        type: String,
        enum: availability_enum_1.Availability,
        default: availability_enum_1.Availability.viewer
    }
}, { _id: false });
exports.productRole = new mongoose.Schema({
    view: {
        type: Boolean,
        default: false
    },
    create: {
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
}, { _id: false });
//# sourceMappingURL=custom-type.schema.js.map