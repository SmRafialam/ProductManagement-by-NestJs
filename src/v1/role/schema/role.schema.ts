import * as mongoose from 'mongoose'
import { productRole, collectionRole } from './custom-type.schema'

export const roleSchema = new mongoose.Schema({
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
        type: productRole,
        default: () => ({})
    },
    collections: {
        type: collectionRole,
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
}, {timestamps: true})