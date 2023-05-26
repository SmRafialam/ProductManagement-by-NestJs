"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.faqCategorySchema = void 0;
const mongoose = require("mongoose");
exports.faqCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    note: {
        type: String,
        trim: true,
        default: ''
    },
    faqs: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Faq',
        default: []
    }
}, { timestamps: true });
//# sourceMappingURL=faq-category.schema.js.map