import * as mongoose from 'mongoose'
import { Schema } from 'mongoose';

enum IngredientUnit {
    GM = 'gram',
    KG = 'kilogram',
    MG = 'milligram',
    LT = 'liter',
    ML = 'milliliter',
  }

export const ingredientSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    dailyValue: {
        ingredientValue: { 
            type: Number,
            default: 0 
        },
        ingredientUnit: {
             type:String,
             enum: Object.values(IngredientUnit),
             default: IngredientUnit.GM,
            },
        hasDailyValue: { 
            type: Boolean,
            default: false
        }
      },
    description: {
        type: String,
        default: ''
    },
    showDescription: { 
        type: Boolean, 
        default: false 
    },
    image: {
        type: String,
        default: ''
    },
    icon: {
        type: String,
        default: ''
    },
    // subIngredients: {
    //     type: String,
    //     ref: 'ingredients',      
    // }
}, {timestamps: true})