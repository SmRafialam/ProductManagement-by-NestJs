"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.answer = void 0;
const mongoose = require("mongoose");
exports.answer = new mongoose.Schema({
    answer: {
        type: String,
        trim: true,
        default: ''
    },
    products: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Product',
        default: []
    },
}, { _id: false });
//# sourceMappingURL=answer.schema.js.map