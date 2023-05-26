"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnippetModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const common_module_1 = require("../../../common/common.module");
const schema_1 = require("./schema");
const snippet_controller_1 = require("./snippet.controller");
const snippet_service_1 = require("./snippet.service");
let SnippetModule = class SnippetModule {
};
SnippetModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'Snippet_Category', schema: schema_1.snippetCategorySchema },
                { name: 'Snippet', schema: schema_1.snippetSchema }
            ]),
            common_module_1.CommonModule
        ],
        controllers: [snippet_controller_1.SnippetController],
        providers: [snippet_service_1.SnippetService]
    })
], SnippetModule);
exports.SnippetModule = SnippetModule;
//# sourceMappingURL=snippet.module.js.map