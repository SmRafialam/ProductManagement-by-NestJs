"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ingredientSchema = void 0;
const mongoose = require("mongoose");
exports.ingredientSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    dailyValue: {
        value: { type: Number, default: Number },
        unit: { type: String, default: "gm" },
        hasDailyValue: { type: Boolean, default: false },
    },
    description: {
        type: String,
        default: ''
    },
    showDescription: {
        type: Boolean,
        default: false
    },
    image: {
        type: String,
        default: ''
    },
    icon: {
        type: String,
        default: ''
    },
}, { timestamps: true });
exports.default = exports.ingredientSchema;
//# sourceMappingURL=ingredients.schema.js.map