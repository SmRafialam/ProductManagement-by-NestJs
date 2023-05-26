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
exports.CreateCategoryMiddleware = void 0;
const common_1 = require("@nestjs/common");
const category_service_1 = require("../category.service");
let CreateCategoryMiddleware = class CreateCategoryMiddleware {
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    async use(req, res, next) {
        const { parent } = req.body;
        if ((parent != undefined || parent != null) && parent !== '') {
            const category = await this.categoryService.getCategoryOrNull(parent);
            if (!category) {
                throw new common_1.HttpException("Parent category not found", common_1.HttpStatus.BAD_REQUEST);
            }
            next();
        }
        else {
            next();
        }
    }
};
CreateCategoryMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [category_service_1.CategoryService])
], CreateCategoryMiddleware);
exports.CreateCategoryMiddleware = CreateCategoryMiddleware;
//# sourceMappingURL=create-category.middleware.js.map