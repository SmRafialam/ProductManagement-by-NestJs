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
exports.RoleService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const common_service_1 = require("../../common/common.service");
const user_service_1 = require("../user/user.service");
let RoleService = class RoleService {
    constructor(roleModel, userService, commonService) {
        this.roleModel = roleModel;
        this.userService = userService;
        this.commonService = commonService;
    }
    async roleList() {
        try {
            const roles = await this.roleModel.find().sort({ name: 1 }).populate('users').exec();
            const returnData = roles.map(role => ({
                id: role.id,
                name: role.name,
                systemAdmin: role.systemAdmin,
                dashboard: role.dashboard,
                products: role.products,
                collections: role.collections,
                priceList: role.priceList,
                users: role.users.map((user) => ({
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
                }))
            }));
            return this.commonService.generateSuccessResponse(returnData);
        }
        catch (error) {
            throw new common_1.HttpException('Something went wrong', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async addRole(roleData) {
        try {
            const newRole = new this.roleModel(Object.assign({}, roleData));
            const role = await newRole.save();
            const returnData = {
                id: role.id,
                name: role.name,
                systemAdmin: role.systemAdmin,
                dashboard: role.dashboard,
                products: role.products,
                collections: role.collections,
                priceList: role.priceList
            };
            return this.commonService.generateSuccessResponse([returnData]);
        }
        catch (error) {
            this.commonService.errorHandler(error);
        }
    }
    async roleById(roleId) {
        try {
            const role = await this.roleModel.findById(roleId).exec();
            if (role != null) {
                const returnData = {
                    id: role.id,
                    name: role.name,
                    systemAdmin: role.systemAdmin,
                    dashboard: role.dashboard,
                    products: role.products,
                    collections: role.collections,
                    priceList: role.priceList,
                    users: role.users.map((user) => ({
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email
                    }))
                };
                return this.commonService.generateSuccessResponse([returnData]);
            }
            throw new common_1.HttpException('Role not found', common_1.HttpStatus.NOT_FOUND);
        }
        catch (error) {
            this.commonService.errorHandler(error);
        }
    }
    async editRole(roleId, roleData) {
        try {
            const role = await this.roleModel.findByIdAndUpdate(roleId, Object.assign({}, roleData), { new: true }).exec();
            if (role != null) {
                const returnData = {
                    id: role.id,
                    name: role.name,
                    systemAdmin: role.systemAdmin,
                    dashboard: role.dashboard,
                    products: role.products,
                    collections: role.collections,
                    priceList: role.priceList
                };
                return this.commonService.generateSuccessResponse([returnData]);
            }
            throw new common_1.HttpException('Role not found', common_1.HttpStatus.NOT_FOUND);
        }
        catch (error) {
            this.commonService.errorHandler(error);
        }
    }
    async deleteRole(roleId) {
        try {
            const role = await this.roleModel.findByIdAndDelete(roleId).exec();
            if (role != null) {
                await this.userService.setNullToUserRoleByRoleId(role.id);
                const res = {
                    message: `${role.name} role has been deleted successfully`
                };
                return this.commonService.generateSuccessResponse([res]);
            }
            throw new common_1.HttpException('Role not found', common_1.HttpStatus.NOT_FOUND);
        }
        catch (error) {
            this.commonService.errorHandler(error);
        }
    }
};
RoleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Role')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        user_service_1.UserService,
        common_service_1.CommonService])
], RoleService);
exports.RoleService = RoleService;
//# sourceMappingURL=role.service.js.map