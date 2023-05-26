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
exports.DeleteRoleMiddleware = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../../user/user.service");
let DeleteRoleMiddleware = class DeleteRoleMiddleware {
    constructor(userService) {
        this.userService = userService;
    }
    async use(req, res, next) {
        const roleId = req.params.id;
        const forceDelete = req.query.forceDelete && req.query.forceDelete === 'true' ? true : false;
        const users = await this.userService.getUsersByRoleId(roleId);
        if (Array.isArray(users) && users.length && !forceDelete) {
            throw new common_1.HttpException("The role could not be removed because some users have been assigned to this role", common_1.HttpStatus.BAD_REQUEST);
        }
        next();
    }
};
DeleteRoleMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], DeleteRoleMiddleware);
exports.DeleteRoleMiddleware = DeleteRoleMiddleware;
//# sourceMappingURL=delete-role.middleware.js.map