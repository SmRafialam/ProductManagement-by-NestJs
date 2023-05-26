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
exports.InviteUserMiddleware = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user.service");
let InviteUserMiddleware = class InviteUserMiddleware {
    constructor(userService) {
        this.userService = userService;
    }
    async use(req, res, next) {
        const { email } = req.body;
        const user = await this.userService.userDataOrNull(email);
        if (user !== null) {
            if (user.status === 'active')
                throw new common_1.HttpException("An active user already exist with the given email", common_1.HttpStatus.CONFLICT);
            req.body.role = user.role.toString();
            req.body.invitedUser = user;
        }
        next();
    }
};
InviteUserMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], InviteUserMiddleware);
exports.InviteUserMiddleware = InviteUserMiddleware;
//# sourceMappingURL=invite-user.middleware.js.map