"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attributeSchema = void 0;
const mongoose = require("mongoose");
exports.attributeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    choices: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Choice',
        default: []
    }
}, { timestamps: true });
//# sourceMappingURL=attribute.schema.js.map