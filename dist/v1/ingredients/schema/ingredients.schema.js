"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ingredientSchema = void 0;
const mongoose = require("mongoose");
var IngredientUnit;
(function (IngredientUnit) {
    IngredientUnit["GM"] = "gram";
    IngredientUnit["KG"] = "kilogram";
    IngredientUnit["MG"] = "milligram";
    IngredientUnit["LT"] = "liter";
    IngredientUnit["ML"] = "milliliter";
})(IngredientUnit || (IngredientUnit = {}));
exports.ingredientSchema = new mongoose.Schema({
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
            type: String,
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
    subIngredients: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ingredient',
        }],
}, { timestamps: true });
//# sourceMappingURL=ingredients.schema.js.map