import * as mongoose from 'mongoose'

enum IngredientUnit {
    gram = 'g',
    // KG = 'kilogram',
    milligram = 'mg',
    // LT = 'liter',
    // ML = 'milliliter',
  }

export const ingredientSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    dailyValue: {
        setDailyValue: {
            type: Boolean,
            default: true
        },
        dailyValueAmount: { 
            type: Number,
            default: 0 
        },
        dailyValueUnit: {
             type:String,
             enum: Object.values(IngredientUnit),
             default: IngredientUnit.gram,
            },
        dailyValueEstablished: { 
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
    isSubIngredient: {
        type: Boolean,
        default: false
    },
    subIngredients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ingredient',
      }],

    // subIngredients: [
    //     {
    //       _id: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         required: true,
    //       },
    //       title: {
    //         type: String,
    //         required: true,
    //       },
    //     },
    //   ],
}, {timestamps: true})
