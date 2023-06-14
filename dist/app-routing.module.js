"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutingModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const auth_module_1 = require("./v1/auth/auth.module");
const attribute_module_1 = require("./v1/collections/attribute/attribute.module");
const choice_module_1 = require("./v1/collections/attribute/choice/choice.module");
const category_module_1 = require("./v1/collections/category/category.module");
const collections_module_1 = require("./v1/collections/collections.module");
const faq_module_1 = require("./v1/collections/faq/faq.module");
const media_module_1 = require("./v1/collections/media/media.module");
const review_module_1 = require("./v1/collections/review/review.module");
const selling_channel_module_1 = require("./v1/collections/selling-channel/selling-channel.module");
const snippet_module_1 = require("./v1/collections/snippet/snippet.module");
const tag_module_1 = require("./v1/collections/tag/tag.module");
const product_module_1 = require("./v1/product/product.module");
const role_module_1 = require("./v1/role/role.module");
const team_module_1 = require("./v1/team/team.module");
const uploader_module_1 = require("./v1/uploader/uploader.module");
const user_module_1 = require("./v1/user/user.module");
const v1_module_1 = require("./v1/v1.module");
const ingredients_module_1 = require("./v1/collections/ingredients/ingredients.module");
const features_module_1 = require("./v1/collections/features/features.module");
const routes = [
    { path: 'api/v1', module: v1_module_1.V1Module, children: [
            { path: 'auth', module: auth_module_1.AuthModule },
            { path: 'user', module: user_module_1.UserModule },
            { path: 'role', module: role_module_1.RoleModule },
            { path: 'team', module: team_module_1.TeamModule },
            { path: 'product', module: product_module_1.ProductModule },
            { path: 'file', module: uploader_module_1.UploaderModule },
            { path: 'collections', module: collections_module_1.CollectionsModule, children: [
                    { path: 'category', module: category_module_1.CategoryModule },
                    { path: 'tag', module: tag_module_1.TagModule },
                    { path: 'faq', module: faq_module_1.FaqModule },
                    { path: 'media', module: media_module_1.MediaModule },
                    { path: 'ingredients', module: ingredients_module_1.IngredientsModule },
                    { path: 'features', module: features_module_1.FeaturesModule },
                    { path: 'review', module: review_module_1.ReviewModule },
                    { path: 'snippet', module: snippet_module_1.SnippetModule },
                    { path: 'selling-channel', module: selling_channel_module_1.SellingChannelModule },
                    { path: 'attribute', module: attribute_module_1.AttributeModule },
                    { path: 'choice', module: choice_module_1.ChoiceModule },
                ] }
        ] }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = __decorate([
    (0, common_1.Module)({
        imports: [core_1.RouterModule.register(routes), v1_module_1.V1Module]
    })
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map