"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvitedUser = void 0;
const common_1 = require("@nestjs/common");
exports.InvitedUser = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const { invitedUser } = request.body;
    return data ? invitedUser === null || invitedUser === void 0 ? void 0 : invitedUser[data] : invitedUser;
});
//# sourceMappingURL=invited-user.decorator.js.map