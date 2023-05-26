import * as mongoose from 'mongoose'

export const faqSchema = new mongoose.Schema({
    question: {
        type: String,
        trim: true,
        required: true
    },
    note: {
        type: String,
        trim: true,
        default: ''
    },
    answers: {
        type: [{
            _id: false,
            answer: {
                type: String,
                trim: true,
                required: true
            },
            products: {
                type: [mongoose.Schema.Types.ObjectId],
                ref: 'Product',
                default: []
            }
        }],
        default: []
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Faq_Category',
        required: true 
    }
}, {timestamps: true})


