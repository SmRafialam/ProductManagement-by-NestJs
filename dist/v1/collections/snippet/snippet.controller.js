"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnippetController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const guard_1 = require("../../auth/guard");
const dto_1 = require("./dto");
const snippet_service_1 = require("./snippet.service");
let SnippetController = class SnippetController {
    constructor(snippetService) {
        this.snippetService = snippetService;
    }
    getCategoryList() {
        return this.snippetService.getCategoryList();
    }
    addCategory(catDto) {
        return this.snippetService.addCategory(catDto);
    }
    updateCategory(catId, catDto) {
        return this.snippetService.updateCategory(catId, catDto);
    }
    deleteCategory(catId) {
        return this.snippetService.deleteCategory(catId);
    }
    getSnippetList() {
        return this.snippetService.getSnippetList();
    }
    addSnippet(snippetCreateDto) {
        return this.snippetService.addSnippet(snippetCreateDto);
    }
    updateSnippet(snippetId, snippetUpdateDto) {
        return this.snippetService.updateSnippet(snippetId, snippetUpdateDto);
    }
    deleteSnippet(snippetId) {
        return this.snippetService.deleteSnippet(snippetId);
    }
};
__decorate([
    (0, common_1.Get)('category'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SnippetController.prototype, "getCategoryList", null);
__decorate([
    (0, common_1.Post)('category'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.SnippetCategoryDto]),
    __metadata("design:returntype", void 0)
], SnippetController.prototype, "addCategory", null);
__decorate([
    (0, common_1.Patch)('category/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.SnippetCategoryDto]),
    __metadata("design:returntype", void 0)
], SnippetController.prototype, "updateCategory", null);
__decorate([
    (0, common_1.Delete)('category/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SnippetController.prototype, "deleteCategory", null);
__decorate([
    (0, common_1.Get)('text'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SnippetController.prototype, "getSnippetList", null);
__decorate([
    (0, common_1.Post)('text'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.SnippetCreateDto]),
    __metadata("design:returntype", void 0)
], SnippetController.prototype, "addSnippet", null);
__decorate([
    (0, common_1.Patch)('text/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.SnippetUpdateDto]),
    __metadata("design:returntype", void 0)
], SnippetController.prototype, "updateSnippet", null);
__decorate([
    (0, common_1.Delete)('text/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SnippetController.prototype, "deleteSnippet", null);
SnippetController = __decorate([
    (0, common_1.UseGuards)(guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('API auth'),
    (0, swagger_1.ApiTags)('text-snippet'),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [snippet_service_1.SnippetService])
], SnippetController);
exports.SnippetController = SnippetController;
//# sourceMappingURL=snippet.controller.js.map