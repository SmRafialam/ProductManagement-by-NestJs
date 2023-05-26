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
exports.ChoiceController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const guard_1 = require("../../../auth/guard");
const choice_service_1 = require("./choice.service");
const dto_1 = require("./dto");
let ChoiceController = class ChoiceController {
    constructor(choiceService) {
        this.choiceService = choiceService;
    }
    getChoiceList() {
        return this.choiceService.getChoiceList();
    }
    addChoice(choiceCreateDto) {
        return this.choiceService.addChoice(choiceCreateDto);
    }
    updateChoice(choiceId, choiceUpdateDto) {
        return this.choiceService.updateChoice(choiceId, choiceUpdateDto);
    }
    deleteChoice(choiceId) {
        return this.choiceService.deleteChoice(choiceId);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ChoiceController.prototype, "getChoiceList", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.ChoiceDto]),
    __metadata("design:returntype", void 0)
], ChoiceController.prototype, "addChoice", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.ChoiceUpdateDto]),
    __metadata("design:returntype", void 0)
], ChoiceController.prototype, "updateChoice", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ChoiceController.prototype, "deleteChoice", null);
ChoiceController = __decorate([
    (0, common_1.UseGuards)(guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('API auth'),
    (0, swagger_1.ApiTags)('choice'),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [choice_service_1.ChoiceService])
], ChoiceController);
exports.ChoiceController = ChoiceController;
//# sourceMappingURL=choice.controller.js.map