import * as mongoose from 'mongoose'

export const faqCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    note: {
        type: String,
        trim: true,
        default: ''
    },
    faqs: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Faq',
        default: []
    }
}, {timestamps: true})