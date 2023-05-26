import * as mongoose from 'mongoose'
import { userStatus } from '../enum'

export const userSchema = new mongoose.Schema({
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
        enum: userStatus,
        default: userStatus.invited
    }
}, {timestamps: true})