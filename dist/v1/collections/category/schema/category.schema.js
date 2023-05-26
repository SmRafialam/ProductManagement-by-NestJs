"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categorySchema = void 0;
const mongoose = require("mongoose");
exports.categorySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    slug: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    shortText: {
        type: String,
        trim: true,
        default: ''
    },
    longText: {
        type: String,
        trim: true,
        default: ''
    },
    media: {
        type: [Object],
        default: []
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        default: null
    }
}, { timestamps: true });
//# sourceMappingURL=category.schema.js.map