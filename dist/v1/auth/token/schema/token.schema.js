"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenSchema = void 0;
const mongoose = require("mongoose");
exports.tokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    token: {
        type: String,
        required: true
    },
    creationAt: {
        type: Date,
        default: Date.now,
        expires: 86400
    }
});
//# sourceMappingURL=token.schema.js.map