"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamSchema = void 0;
const mongoose = require("mongoose");
exports.teamSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    users: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        default: []
    },
    products: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Product',
        default: []
    }
}, { timestamps: true });
//# sourceMappingURL=team.schema.js.map