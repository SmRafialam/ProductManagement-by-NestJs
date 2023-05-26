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
exports.FaqController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const guard_1 = require("../../auth/guard");
const dto_1 = require("./dto");
const faq_service_1 = require("./faq.service");
let FaqController = class FaqController {
    constructor(faqService) {
        this.faqService = faqService;
    }
    getfaqList() {
        return this.faqService.getFaqDetail();
    }
    getCategoryList() {
        return this.faqService.getCategoryList();
    }
    addFaqCategory(faqCatCreateDto) {
        return this.faqService.addFaqCategory(faqCatCreateDto);
    }
    editFaqCategory(faqCatId, faqCatUpdateDto) {
        return this.faqService.editFaqCategory(faqCatId, faqCatUpdateDto);
    }
    deleteFaqCategory(faqCatId) {
        return this.faqService.deleteFaqCategory(faqCatId);
    }
    getFaqList() {
        return this.faqService.getFaqList();
    }
    addFaq(faqCreateDto) {
        return this.faqService.addFaq(faqCreateDto);
    }
    editFaq(questionId, faqUpdateDto) {
        return this.faqService.editFaq(questionId, faqUpdateDto);
    }
    deleteFaq(questionId) {
        return this.faqService.deleteFaq(questionId);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FaqController.prototype, "getfaqList", null);
__decorate([
    (0, common_1.Get)('category'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FaqController.prototype, "getCategoryList", null);
__decorate([
    (0, common_1.Post)('category'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.FaqCategoryDto]),
    __metadata("design:returntype", void 0)
], FaqController.prototype, "addFaqCategory", null);
__decorate([
    (0, common_1.Patch)('category/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.FaqCategoryDto]),
    __metadata("design:returntype", void 0)
], FaqController.prototype, "editFaqCategory", null);
__decorate([
    (0, common_1.Delete)('category/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FaqController.prototype, "deleteFaqCategory", null);
__decorate([
    (0, common_1.Get)('question'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FaqController.prototype, "getFaqList", null);
__decorate([
    (0, common_1.Post)('question'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.FaqCreateDto]),
    __metadata("design:returntype", void 0)
], FaqController.prototype, "addFaq", null);
__decorate([
    (0, common_1.Patch)('question/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.FaqUpdateDto]),
    __metadata("design:returntype", void 0)
], FaqController.prototype, "editFaq", null);
__decorate([
    (0, common_1.Delete)('question/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FaqController.prototype, "deleteFaq", null);
FaqController = __decorate([
    (0, common_1.UseGuards)(guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('API auth'),
    (0, swagger_1.ApiTags)('faq'),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [faq_service_1.FaqService])
], FaqController);
exports.FaqController = FaqController;
//# sourceMappingURL=faq.controller.js.map