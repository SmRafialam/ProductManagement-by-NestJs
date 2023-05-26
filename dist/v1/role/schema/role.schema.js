"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleSchema = void 0;
const mongoose = require("mongoose");
const custom_type_schema_1 = require("./custom-type.schema");
exports.roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    systemAdmin: {
        type: Boolean,
        default: false
    },
    dashboard: {
        type: Boolean,
        default: false
    },
    products: {
        type: custom_type_schema_1.productRole,
        default: () => ({})
    },
    collections: {
        type: custom_type_schema_1.collectionRole,
        default: () => ({})
    },
    priceList: {
        type: Boolean,
        default: false
    },
    users: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        default: []
    }
}, { timestamps: true });
//# sourceMappingURL=role.schema.js.map