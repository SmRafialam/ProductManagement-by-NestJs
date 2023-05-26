"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Destination = void 0;
const mongoose = require("mongoose");
exports.Destination = new mongoose.Schema({
    platform: {
        type: String,
        trim: true,
        required: true
    },
    source: {
        type: String,
        trim: true,
        required: true
    }
}, { _id: false });
//# sourceMappingURL=destination.schema.js.map