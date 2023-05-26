"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sellingChannelSchema = void 0;
const mongoose = require("mongoose");
const destination_schema_1 = require("./destination.schema");
exports.sellingChannelSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    destination: {
        type: destination_schema_1.Destination,
        required: true
    },
    country: {
        type: String,
        trim: true,
        required: true
    },
    priceList: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Price_List',
        required: true
    },
    screens: {
        type: [String],
        default: []
    }
}, { timestamps: true });
//# sourceMappingURL=selling-channel.schema.js.map