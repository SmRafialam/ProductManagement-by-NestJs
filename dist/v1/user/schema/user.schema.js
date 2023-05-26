"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const mongoose = require("mongoose");
const enum_1 = require("../enum");
exports.userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        default: '',
    },
    lastName: {
        type: String,
        trim: true,
        default: '',
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        trim: true,
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        trim: true,
        default: null
    },
    superAdmin: {
        type: Boolean,
        default: false
    },
    teams: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Team',
        default: []
    },
    avatar: {
        type: String,
        default: '',
        trim: true
    },
    refreshToken: {
        type: String,
        default: null
    },
    status: {
        type: String,
        enum: enum_1.userStatus,
        default: enum_1.userStatus.invited
    }
}, { timestamps: true });
//# sourceMappingURL=user.schema.js.map