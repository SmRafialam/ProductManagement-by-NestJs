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
exports.SellingChannelController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const guard_1 = require("../../auth/guard");
const dto_1 = require("./dto");
const selling_channel_service_1 = require("./selling-channel.service");
let SellingChannelController = class SellingChannelController {
    constructor(sellingChannelService) {
        this.sellingChannelService = sellingChannelService;
    }
    getSellingChannelList() {
        return this.sellingChannelService.getSellingChannelList();
    }
    addSellingChannel(sellingChannelCreateDto) {
        return this.sellingChannelService.addSellingChannel(sellingChannelCreateDto);
    }
    getSellingChannelById(channelId) {
        return this.sellingChannelService.getSellingChannelById(channelId);
    }
    updateSellingChannel(channelId, sellingChannelUpdateDto) {
        return this.sellingChannelService.updateSellingChannel(channelId, sellingChannelUpdateDto);
    }
    deleteSellingChannel(channelId) {
        return this.sellingChannelService.deleteSellingChannel(channelId);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SellingChannelController.prototype, "getSellingChannelList", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.SellingChannelDto]),
    __metadata("design:returntype", void 0)
], SellingChannelController.prototype, "addSellingChannel", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SellingChannelController.prototype, "getSellingChannelById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.SellingChannelDto]),
    __metadata("design:returntype", void 0)
], SellingChannelController.prototype, "updateSellingChannel", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SellingChannelController.prototype, "deleteSellingChannel", null);
SellingChannelController = __decorate([
    (0, common_1.UseGuards)(guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('API auth'),
    (0, swagger_1.ApiTags)('selling-channel'),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [selling_channel_service_1.SellingChannelService])
], SellingChannelController);
exports.SellingChannelController = SellingChannelController;
//# sourceMappingURL=selling-channel.controller.js.map