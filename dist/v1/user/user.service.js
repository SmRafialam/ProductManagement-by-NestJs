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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
const argon2 = require("argon2");
const common_service_1 = require("../../common/common.service");
const token_service_1 = require("../auth/token/token.service");
const mail_service_1 = require("../../mail/mail.service");
const enum_1 = require("./enum");
let UserService = class UserService {
    constructor(userModel, teamModel, roleModel, tokenService, commonService, mailService) {
        this.userModel = userModel;
        this.teamModel = teamModel;
        this.roleModel = roleModel;
        this.tokenService = tokenService;
        this.commonService = commonService;
        this.mailService = mailService;
    }
    async createSuperUser() {
        try {
            const superUser = await this.userModel.findOne({ email: process.env.SUPER_USER_EMAIL }).exec();
            if (superUser != null) {
                throw new common_1.HttpException('Super user already exist', common_1.HttpStatus.CONFLICT);
            }
            const encodedPassword = await bcrypt.hash(process.env.SUPER_USER_PASSWORD, 10);
            const newSuperUser = new this.userModel({
                firstName: 'Omicron',
                lastName: 'IT',
                email: process.env.SUPER_USER_EMAIL,
                password: encodedPassword,
                superAdmin: true
            });
            await newSuperUser.save();
            const res = {
                message: `Super user has been created`
            };
            return this.commonService.generateSuccessResponse([res]);
        }
        catch (error) {
            this.commonService.errorHandler(error);
        }
    }
    async getUsers() {
        try {
            const users = await this.userModel.find().sort({ firstName: 1 }).exec();
            const returnData = users.map(user => ({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                superAdmin: user.superAdmin,
                teams: user.teams,
                avatar: user.avatar,
                status: user.status
            }));
            return this.commonService.generateSuccessResponse(returnData);
        }
        catch (error) {
            this.commonService.errorHandler(error);
        }
    }
    async addUser(userData) {
        try {
            if (userData.password) {
                userData.password = await bcrypt.hash(userData.password, 10);
                delete userData['passwordConfirm'];
            }
            const user = new this.userModel(Object.assign({}, userData));
            const createdUser = await user.save();
            await this.teamModel.updateMany({ '_id': createdUser.teams }, { $push: { users: createdUser.id } });
            await this.roleModel.updateOne({ '_id': createdUser.role }, { $push: { users: createdUser.id } });
            const returnData = {
                id: createdUser.id,
                firstName: createdUser.firstName,
                lastName: createdUser.lastName,
                email: createdUser.email
            };
            return this.commonService.generateSuccessResponse([returnData]);
        }
        catch (error) {
            this.commonService.errorHandler(error);
        }
    }
    async getUser(userId) {
        try {
            const user = await this.userModel.findById(userId).populate({ path: 'role', select: '-_id -__v -users' }).exec();
            if (user != null) {
                const returnData = {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    role: user.role,
                    superAdmin: user.superAdmin,
                    teams: user.teams,
                    avatar: user.avatar,
                    status: user.status
                };
                return this.commonService.generateSuccessResponse([returnData]);
            }
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        catch (error) {
            this.commonService.errorHandler(error);
        }
    }
    async getUserByEmailId(email) {
        try {
            const user = await this.userModel.findOne({ email: email }).exec();
            if (user != null) {
                const returnData = {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    role: user.role,
                    superAdmin: user.superAdmin,
                    teams: user.teams,
                    avatar: user.avatar,
                    status: user.status
                };
                return this.commonService.generateSuccessResponse([returnData]);
            }
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        catch (error) {
            this.commonService.errorHandler(error);
        }
    }
    async validateUser(email, password) {
        try {
            const user = await this.userModel.findOne({ email: email }).exec();
            if (!user)
                throw new common_1.HttpException('Authentication error', common_1.HttpStatus.FORBIDDEN);
            const matched = await bcrypt.compare(password, user.password);
            if (!matched)
                throw new common_1.HttpException('Authentication error', common_1.HttpStatus.FORBIDDEN);
            const returnData = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            };
            return this.commonService.generateSuccessResponse([returnData]);
        }
        catch (error) {
            this.commonService.errorHandler(error);
        }
    }
    async editUser(userId, userData) {
        try {
            const user = await this.userModel.findById(userId).exec();
            if (user != null) {
                const prevTeamIds = user.teams.map((team) => team.toString());
                const newTeamIds = userData.teams || null;
                const newRoleId = userData.role || null;
                const prevRoleId = user.role ? user.role.toString() : '';
                if (userData.password) {
                    userData.password = await bcrypt.hash(userData.password, 10);
                    delete userData['passwordConfirm'];
                }
                const updateUser = await this.userModel.findByIdAndUpdate(userId, Object.assign({}, userData), { new: true }).exec();
                if (Array.isArray(newTeamIds)) {
                    const { add, remove } = await this.commonService.changeable_ids(newTeamIds, prevTeamIds);
                    if (add.length)
                        await this.teamModel.updateMany({ '_id': add }, { $addToSet: { users: updateUser.id } });
                    if (remove.length)
                        await this.teamModel.updateMany({ '_id': remove }, { $pull: { users: updateUser.id } });
                }
                if (newRoleId != null && newRoleId !== prevRoleId) {
                    if (newRoleId)
                        await this.roleModel.updateOne({ '_id': newRoleId }, { $addToSet: { users: updateUser.id } });
                    if (prevRoleId)
                        await this.roleModel.updateOne({ '_id': prevRoleId }, { $pull: { users: updateUser.id } });
                }
                const returnData = {
                    id: updateUser.id,
                    firstName: updateUser.firstName,
                    lastName: updateUser.lastName,
                    email: updateUser.email,
                    role: updateUser.role,
                    superAdmin: updateUser.superAdmin,
                    teams: updateUser.teams,
                    avatar: updateUser.avatar,
                    status: updateUser.status
                };
                return this.commonService.generateSuccessResponse([returnData]);
            }
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        catch (error) {
            this.commonService.errorHandler(error);
        }
    }
    async userSettings(userId, userData) {
        try {
            const user = await this.userModel.findById(userId).exec();
            if (user != null) {
                const prevTeamIds = user.teams.map((team) => team.toString());
                const newTeamIds = userData.teams || null;
                const newRoleId = userData.role || null;
                const prevRoleId = user.role ? user.role.toString() : '';
                const updateUser = await this.userModel.findByIdAndUpdate(userId, Object.assign({}, userData), { new: true }).exec();
                if (Array.isArray(newTeamIds)) {
                    const { add, remove } = await this.commonService.changeable_ids(newTeamIds, prevTeamIds);
                    if (add.length)
                        await this.teamModel.updateMany({ '_id': add }, { $addToSet: { users: updateUser.id } });
                    if (remove.length)
                        await this.teamModel.updateMany({ '_id': remove }, { $pull: { users: updateUser.id } });
                }
                if (newRoleId != null && newRoleId !== prevRoleId) {
                    if (newRoleId)
                        await this.roleModel.updateOne({ '_id': newRoleId }, { $addToSet: { users: updateUser.id } });
                    if (prevRoleId)
                        await this.roleModel.updateOne({ '_id': prevRoleId }, { $pull: { users: updateUser.id } });
                }
                const returnData = {
                    id: updateUser.id,
                    email: updateUser.email,
                    role: updateUser.role,
                    teams: updateUser.teams,
                };
                return this.commonService.generateSuccessResponse([returnData]);
            }
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        catch (error) {
            this.commonService.errorHandler(error);
        }
    }
    async updateUserProfile(userId, userData) {
        try {
            const user = await this.userModel.findById(userId).exec();
            if (user != null) {
                if (userData.password) {
                    userData.password = await bcrypt.hash(userData.password, 10);
                    delete userData['passwordConfirm'];
                }
                const updateUser = await this.userModel.findByIdAndUpdate(userId, Object.assign({}, userData), { new: true }).exec();
                const returnData = {
                    id: updateUser.id,
                    firstName: updateUser.firstName,
                    lastName: updateUser.lastName,
                    email: updateUser.email,
                    avatar: updateUser.avatar,
                };
                return this.commonService.generateSuccessResponse([returnData]);
            }
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        catch (error) {
            this.commonService.errorHandler(error);
        }
    }
    async changePassword(userId, password) {
        try {
            const hashed = await bcrypt.hash(password, 10);
            await this.userModel.updateOne({ '_id': userId }, { $set: { password: hashed } }).exec();
        }
        catch (error) {
            this.commonService.errorHandler(error);
        }
    }
    async deleteUser(userId) {
        try {
            const user = await this.userModel.findById(userId).exec();
            if (user != null) {
                await this.teamModel.updateMany({ '_id': user.teams }, { $pull: { users: user.id } });
                await this.roleModel.updateOne({ '_id': user.role }, { $pull: { users: user.id } });
                if (user.superAdmin)
                    throw new common_1.HttpException("You don't have the permission", common_1.HttpStatus.UNAUTHORIZED);
                await this.userModel.findByIdAndDelete(userId).exec();
                const res = {
                    message: `${user.firstName} ${user.lastName} user has been deleted successfully`
                };
                return this.commonService.generateSuccessResponse([res]);
            }
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        catch (error) {
            this.commonService.errorHandler(error);
        }
    }
    async setNullToUserRoleByRoleId(roleId) {
        try {
            await this.userModel.updateMany({ role: roleId }, { $set: { role: null } });
        }
        catch (error) {
            this.commonService.errorHandler(error);
        }
    }
    async getUsersByRoleId(roleId) {
        try {
            const users = await this.userModel.find({ role: roleId });
            const returnData = users.map(user => ({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                status: user.status
            }));
            return this.commonService.generateSuccessResponse(returnData);
        }
        catch (error) {
            this.commonService.errorHandler(error);
        }
    }
    async setRefreshToken(userId, rfToken) {
        try {
            const hashedToken = await argon2.hash(rfToken);
            await this.userModel.findByIdAndUpdate(userId, { refreshToken: hashedToken }).exec();
        }
        catch (error) {
            this.commonService.errorHandler(error);
        }
    }
    async getRefreshToken(userId) {
        try {
            const user = await this.userModel.findById(userId).select('refreshToken email').exec();
            const res = {
                id: user.id,
                email: user.email,
                refreshToken: user.refreshToken
            };
            return this.commonService.generateSuccessResponse([res]);
        }
        catch (error) {
            this.commonService.errorHandler(error);
        }
    }
    async userInvitation(createData, user) {
        let userId;
        if (user !== undefined) {
            userId = user.id;
            await this.userModel.updateOne({ _id: userId }, { $set: { status: enum_1.userStatus.invited } });
        }
        else {
            const { result } = await this.addUser(createData);
            const newUser = result[0];
            userId = newUser.id;
        }
        const token = await this.tokenService.getUserToken(userId);
        const link = `${process.env.BASE_URL}/invitation/?id=${userId}&token=${token.token}`;
        const { accepted } = await this.mailService.sendInvitation(createData.email, "PIM Invitation", link);
        if (Array.isArray(accepted) && accepted.length) {
            const res = {
                message: `Invitation link sent to the email account`
            };
            return this.commonService.generateSuccessResponse([res]);
        }
        throw new common_1.HttpException('An error occured', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
    async confirmInvitation(userId, token, invitedUser) {
        const isValid = await this.tokenService.validateToken(userId, token);
        if (!isValid)
            throw new common_1.HttpException('Invalid link or expired', common_1.HttpStatus.BAD_REQUEST);
        invitedUser.password = await bcrypt.hash(invitedUser.password, 10);
        delete invitedUser['passwordConfirm'];
        await this.userModel.findByIdAndUpdate(userId, Object.assign(Object.assign({}, invitedUser), { status: enum_1.userStatus.active }));
        await this.tokenService.deleteToken(userId, token);
        const res = {
            message: `User invitation has been confirmed`
        };
        return this.commonService.generateSuccessResponse([res]);
    }
    async rollbackInvitation(id) {
        try {
            let text = '';
            const user = await this.userModel.findById(id).exec();
            if (user && user.status === 'invited') {
                user.status = enum_1.userStatus.invitation_cancelled;
                await user.save();
                await this.tokenService.deleteTokenByUserId(id);
                text = 'Invitation cancelled';
            }
            else {
                text = 'Not a invited user';
            }
            const res = { message: text };
            return this.commonService.generateSuccessResponse([res]);
        }
        catch (error) {
            throw new common_1.HttpException(error, error === null || error === void 0 ? void 0 : error.status);
        }
    }
    async userDataOrNull(uniqueId) {
        try {
            const queryFilter = [{ email: uniqueId }];
            if (mongoose_2.Types.ObjectId.isValid(uniqueId))
                queryFilter.push({ _id: uniqueId });
            const user = await this.userModel.findOne({
                $or: queryFilter
            });
            if (user !== null) {
                const returnData = {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    role: user.role,
                    superAdmin: user.superAdmin,
                    teams: user.teams,
                    avatar: user.avatar,
                    status: user.status
                };
                return returnData;
            }
            return null;
        }
        catch (error) {
            this.commonService.errorHandler(error);
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __param(1, (0, mongoose_1.InjectModel)('Team')),
    __param(2, (0, mongoose_1.InjectModel)('Role')),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => token_service_1.TokenService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        token_service_1.TokenService,
        common_service_1.CommonService,
        mail_service_1.MailService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map