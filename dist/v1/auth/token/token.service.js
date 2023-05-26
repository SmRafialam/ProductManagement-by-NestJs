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
exports.TokenService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const crypto_1 = require("crypto");
const mongoose_2 = require("mongoose");
const user_service_1 = require("../../user/user.service");
let TokenService = class TokenService {
    constructor(tokenModel, userService) {
        this.tokenModel = tokenModel;
        this.userService = userService;
    }
    async getUserToken(userId) {
        try {
            let token = await this.tokenModel.findOne({ userId: userId });
            if (!token) {
                token = await new this.tokenModel({
                    userId: userId,
                    token: (0, crypto_1.randomBytes)(32).toString("hex"),
                }).save();
            }
            const returnData = {
                userId: token.userId,
                token: token.token,
            };
            return returnData;
        }
        catch (error) {
            throw new common_1.HttpException('Internal server error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async validateToken(userId, token) {
        const user = await this.userService.userDataOrNull(userId);
        if (!user)
            throw new common_1.HttpException('Invalid link or expired', common_1.HttpStatus.BAD_REQUEST);
        try {
            const data = await this.tokenModel.findOne({
                userId: userId,
                token: token,
            }).exec();
            return data !== null ? true : false;
        }
        catch (error) {
            throw new common_1.HttpException('Invalid link or expired', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async deleteToken(userId, token) {
        try {
            await this.tokenModel.deleteOne({
                userId: userId,
                token: token,
            }).exec();
        }
        catch (error) {
            throw new common_1.HttpException('Something went wrong ', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteTokenByUserId(userId) {
        try {
            await this.tokenModel.deleteOne({
                userId: userId,
            }).exec();
        }
        catch (error) {
            throw new common_1.HttpException('Something went wrong ', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
TokenService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Token')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        user_service_1.UserService])
], TokenService);
exports.TokenService = TokenService;
//# sourceMappingURL=token.service.js.map