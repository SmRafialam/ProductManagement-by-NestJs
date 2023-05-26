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
exports.CollectionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const enum_1 = require("../enum");
class CollectionDto {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsEnum)(enum_1.Availability),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CollectionDto.prototype, "categories", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsEnum)(enum_1.Availability),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CollectionDto.prototype, "attributes", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsEnum)(enum_1.Availability),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CollectionDto.prototype, "mediaCategories", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsEnum)(enum_1.Availability),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CollectionDto.prototype, "formula", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsEnum)(enum_1.Availability),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CollectionDto.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsEnum)(enum_1.Availability),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CollectionDto.prototype, "metadata", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsEnum)(enum_1.Availability),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CollectionDto.prototype, "textSnippets", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsEnum)(enum_1.Availability),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CollectionDto.prototype, "sellingChannels", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsEnum)(enum_1.Availability),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CollectionDto.prototype, "taxesFees", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsEnum)(enum_1.Availability),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CollectionDto.prototype, "teams", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsEnum)(enum_1.Availability),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CollectionDto.prototype, "reviews", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsEnum)(enum_1.Availability),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CollectionDto.prototype, "faq", void 0);
exports.CollectionDto = CollectionDto;
//# sourceMappingURL=collection.dto.js.map