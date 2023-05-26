import * as mongoose from 'mongoose'
import { Destination } from './destination.schema'

export const sellingChannelSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    destination: {
        type: Destination,
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
}, {timestamps: true})