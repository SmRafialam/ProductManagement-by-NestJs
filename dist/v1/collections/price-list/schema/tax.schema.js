"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taxSchema = void 0;
const mongoose = require("mongoose");
exports.taxSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        lowercase: true
    },
    amount: {
        type: Number
    },
    evaluateIn: {
        type: String,
        trim: true,
        lowercase: true,
    }
}, { _id: false });
//# sourceMappingURL=tax.schema.js.map