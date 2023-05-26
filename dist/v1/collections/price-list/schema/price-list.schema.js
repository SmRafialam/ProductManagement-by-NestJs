"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.proceListSchema = void 0;
const mongoose = require("mongoose");
exports.proceListSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    currency: {
        type: String,
        trim: true,
        lowercase: true,
        required: true
    },
    taxes: [{
            name: {
                type: String,
                trim: true,
                lowercase: true,
            },
            amount: {
                type: Number
            },
            evaluateIn: {
                type: String,
                trim: true,
                lowercase: true,
            }
        }]
}, { timestamps: true });
//# sourceMappingURL=price-list.schema.js.map