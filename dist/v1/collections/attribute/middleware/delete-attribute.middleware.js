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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteAttributeMiddleware = void 0;
const common_1 = require("@nestjs/common");
const attribute_service_1 = require("../attribute.service");
let DeleteAttributeMiddleware = class DeleteAttributeMiddleware {
    constructor(attributeService) {
        this.attributeService = attributeService;
    }
    async use(req, res, next) {
        const attrId = req.params.id;
        const forceDelete = req.query.forceDelete && req.query.forceDelete === 'true' ? true : false;
        const { isSuccess, result } = await this.attributeService.getAttributeById(attrId);
        const attribute = result[0];
        if (Array.isArray(attribute.choices) && attribute.choices.length && !forceDelete) {
            throw new common_1.HttpException("The attribute could not be removed because some choices have been assigned to this attribute", common_1.HttpStatus.BAD_REQUEST);
        }
        next();
    }
};
DeleteAttributeMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [attribute_service_1.AttributeService])
], DeleteAttributeMiddleware);
exports.DeleteAttributeMiddleware = DeleteAttributeMiddleware;
//# sourceMappingURL=delete-attribute.middleware.js.map