"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.snippetSchema = exports.snippetCategorySchema = void 0;
const mongoose = require("mongoose");
exports.snippetCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    snippets: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Snippet',
        default: []
    }
}, { timestamps: true });
exports.snippetSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    snippetId: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Snippet_Category',
        required: true
    },
    text: {
        type: String,
        trim: true,
        required: true
    }
}, { timestamps: true });
//# sourceMappingURL=snippet.schema.js.map