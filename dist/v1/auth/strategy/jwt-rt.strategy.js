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
exports.JwtRtStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const argon2 = require("argon2");
const user_service_1 = require("../../user/user.service");
let JwtRtStrategy = class JwtRtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt-refresh') {
    constructor(userService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_RT_SECRET,
            passReqToCallback: true
        });
        this.userService = userService;
    }
    async validate(req, payload) {
        const { result } = await this.userService.getRefreshToken(payload.sub);
        const user = result[0];
        if (!user || !user.refreshToken)
            return null;
        const reqToken = req.headers.authorization.replace('Bearer', '').trim();
        const matched = await argon2.verify(user.refreshToken, reqToken);
        if (!matched)
            return null;
        return user;
    }
};
JwtRtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], JwtRtStrategy);
exports.JwtRtStrategy = JwtRtStrategy;
//# sourceMappingURL=jwt-rt.strategy.js.map