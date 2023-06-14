"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IngredientsModule = void 0;
const common_1 = require("@nestjs/common");
const ingredients_service_1 = require("./ingredients.service");
const ingredients_controller_1 = require("./ingredients.controller");
const mongoose_1 = require("@nestjs/mongoose");
const ingredients_schema_1 = require("./schema/ingredients.schema");
const common_service_1 = require("../../../common/common.service");
let IngredientsModule = class IngredientsModule {
};
IngredientsModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: 'Ingredient', schema: ingredients_schema_1.ingredientSchema }])],
        controllers: [ingredients_controller_1.IngredientsController],
        providers: [ingredients_service_1.IngredientsService, common_service_1.CommonService]
    })
], IngredientsModule);
exports.IngredientsModule = IngredientsModule;
//# sourceMappingURL=ingredients.module.js.map