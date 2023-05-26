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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const common_service_1 = require("../../common/common.service");
const mail_service_1 = require("../../mail/mail.service");
const user_service_1 = require("../user/user.service");
const token_service_1 = require("./token/token.service");
let AuthService = class AuthService {
    constructor(userService, jwtService, tokenService, mailService, commonService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.tokenService = tokenService;
        this.mailService = mailService;
        this.commonService = commonService;
    }
    async login(loginDto) {
        const { result } = await this.userService.validateUser(loginDto.email, loginDto.password);
        const user = result[0];
        return await this.generateTokens(user.id, user.email);
    }
    async superUser() {
        return await this.userService.createSuperUser();
    }
    async generateTokens(userId, email) {
        const payload = { sub: userId, email: email };
        const AccessToken = this.jwtService.sign(payload, { secret: process.env.JWT_SECRET, expiresIn: process.env.JWT_EXPIRES_IN });
        const RefrershToken = this.jwtService.sign(payload, { secret: process.env.JWT_RT_SECRET, expiresIn: process.env.JWT_RT_EXPIRES_IN });
        await this.userService.setRefreshToken(userId, RefrershToken);
        return {
            'access_token': AccessToken,
            'refresh_token': RefrershToken,
            'token_type': 'Bearer',
            'expires_in': this.commonService.convertToSeconds(process.env.JWT_EXPIRES_IN)
        };
    }
    async resetPassword(email) {
        try {
            const { result } = await this.userService.getUserByEmailId(email);
            const user = result.length ? result[0] : null;
            if (user !== null) {
                const token = await this.tokenService.getUserToken(user.id);
                if (token !== null) {
                    const link = `${process.env.BASE_URL}/password-reset/?id=${user.id}&token=${token.token}`;
                    const { accepted } = await this.mailService.sendResetLink(user.email, "Password reset", link, user.firstName);
                    if (Array.isArray(accepted) && accepted.length) {
                        const res = {
                            message: `Password reset link sent to the email account`
                        };
                        return this.commonService.generateSuccessResponse([res]);
                    }
                    throw new common_1.HttpException('An error occured', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                }
                throw new common_1.HttpException('Something went wrong', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            throw new common_1.HttpException('Not a valid user', common_1.HttpStatus.BAD_REQUEST);
        }
        catch (error) {
            this.commonService.errorHandler(error);
        }
    }
    async managePassword(userId, token, password) {
        const isValid = await this.tokenService.validateToken(userId, token);
        if (!isValid)
            throw new common_1.HttpException('Invalid link or expired', common_1.HttpStatus.BAD_REQUEST);
        await this.userService.changePassword(userId, password);
        await this.tokenService.deleteToken(userId, token);
        const res = {
            message: `password reset sucessfully`
        };
        return this.commonService.generateSuccessResponse([res]);
    }
    async verifyLink(userId, token) {
        const isValid = await this.tokenService.validateToken(userId, token);
        if (!isValid)
            throw new common_1.HttpException('Invalid link or expired', common_1.HttpStatus.BAD_REQUEST);
        const res = {
            message: `Token is valid`
        };
        return this.commonService.generateSuccessResponse([res]);
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        token_service_1.TokenService,
        mail_service_1.MailService,
        common_service_1.CommonService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map