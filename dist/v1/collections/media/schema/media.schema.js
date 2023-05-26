"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mediaSchema = exports.mediaCategorySchema = void 0;
const mongoose = require("mongoose");
const custom_type_schema_1 = require("./custom-type.schema");
exports.mediaCategorySchema = new mongoose.Schema({
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
}, { timestamps: true });
exports.mediaSchema = new mongoose.Schema({
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
        type: custom_type_schema_1.mediaExtension,
        default: () => ({})
    },
    sizeLimit: {
        type: custom_type_schema_1.mediaSizeLimit,
        default: () => ({})
    },
    quantity: {
        type: custom_type_schema_1.mediaQuantity,
        default: () => ({})
    }
}, { timestamps: true });
//# sourceMappingURL=media.schema.js.map