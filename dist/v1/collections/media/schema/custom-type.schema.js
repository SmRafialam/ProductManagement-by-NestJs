"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mediaQuantity = exports.mediaSizeLimit = exports.mediaExtension = void 0;
const mongoose = require("mongoose");
exports.mediaExtension = new mongoose.Schema({
    image: {
        type: [String],
        default: []
    },
    video: {
        type: [String],
        default: []
    },
    document: {
        type: [String],
        default: []
    }
}, { _id: false });
exports.mediaSizeLimit = new mongoose.Schema({
    image: {
        type: Object,
        default: null
    },
    video: {
        type: Object,
        default: null
    },
    document: {
        type: Object,
        default: null
    }
}, { _id: false });
exports.mediaQuantity = new mongoose.Schema({
    min: {
        type: Number,
        default: 1
    },
    max: {
        type: Number,
        default: 10
    }
}, { _id: false });
//# sourceMappingURL=custom-type.schema.js.map