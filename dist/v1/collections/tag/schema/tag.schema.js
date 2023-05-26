"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagSchema = void 0;
const mongoose = require("mongoose");
exports.tagSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        required: true
    }
}, { timestamps: true });
//# sourceMappingURL=tag.schema.js.map