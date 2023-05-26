import * as mongoose from 'mongoose'

export const attributeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique:true,
        trim: true,
    },
    choices: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Choice',
        default: []
    }
}, {timestamps: true})

