import * as mongoose from 'mongoose'

export const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    users: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        default: [] 
    },
    products: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Product',
        default: [] 
    }
}, {timestamps: true})