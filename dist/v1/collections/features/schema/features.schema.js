"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.featureSchema = void 0;
const mongoose = require("mongoose");
exports.featureSchema = new mongoose.Schema({
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
}, { timestamps: true });
//# sourceMappingURL=features.schema.js.map