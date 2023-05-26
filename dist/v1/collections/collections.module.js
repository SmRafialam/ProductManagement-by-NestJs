"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionsModule = void 0;
const common_1 = require("@nestjs/common");
const category_module_1 = require("./category/category.module");
const attribute_module_1 = require("./attribute/attribute.module");
const faq_module_1 = require("./faq/faq.module");
const media_module_1 = require("./media/media.module");
const price_list_module_1 = require("./price-list/price-list.module");
const review_module_1 = require("./review/review.module");
const snippet_module_1 = require("./snippet/snippet.module");
const tag_module_1 = require("./tag/tag.module");
const selling_channel_module_1 = require("./selling-channel/selling-channel.module");
let CollectionsModule = class CollectionsModule {
};
CollectionsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            category_module_1.CategoryModule,
            attribute_module_1.AttributeModule,
            faq_module_1.FaqModule,
            media_module_1.MediaModule,
            price_list_module_1.PriceListModule,
            review_module_1.ReviewModule,
            snippet_module_1.SnippetModule,
            tag_module_1.TagModule,
            selling_channel_module_1.SellingChannelModule
        ]
    })
], CollectionsModule);
exports.CollectionsModule = CollectionsModule;
//# sourceMappingURL=collections.module.js.map