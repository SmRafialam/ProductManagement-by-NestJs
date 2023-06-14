"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.V1Module = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./user/user.module");
const v1_controller_1 = require("./v1.controller");
const role_module_1 = require("./role/role.module");
const team_module_1 = require("./team/team.module");
const collections_module_1 = require("./collections/collections.module");
const product_module_1 = require("./product/product.module");
const uploader_module_1 = require("./uploader/uploader.module");
const attribute_module_1 = require("./collections/attribute/attribute.module");
const mail_module_1 = require("../mail/mail.module");
const test_items_module_1 = require("./test-items/test-items.module");
const ingredients_module_1 = require("./collections/ingredients/ingredients.module");
const features_module_1 = require("./collections/features/features.module");
let V1Module = class V1Module {
};
V1Module = __decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule, mail_module_1.MailModule, user_module_1.UserModule, role_module_1.RoleModule, team_module_1.TeamModule, collections_module_1.CollectionsModule, product_module_1.ProductModule, uploader_module_1.UploaderModule, attribute_module_1.AttributeModule, test_items_module_1.TestItemsModule, ingredients_module_1.IngredientsModule, features_module_1.FeaturesModule],
        controllers: [v1_controller_1.V1Controller]
    })
], V1Module);
exports.V1Module = V1Module;
//# sourceMappingURL=v1.module.js.map