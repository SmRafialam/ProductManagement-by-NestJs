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
exports.TeamService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const common_service_1 = require("../../common/common.service");
let TeamService = class TeamService {
    constructor(teamModel, userModel, commonService) {
        this.teamModel = teamModel;
        this.userModel = userModel;
        this.commonService = commonService;
    }
    async getTeamList() {
        try {
            const teams = await this.teamModel.find().sort({ name: 1 }).populate('users').exec();
            const returnData = teams.map(team => ({
                id: team.id,
                name: team.name,
                users: team.users.map((user) => ({
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
                })),
                products: team.products,
                createdAt: team.createdAt,
                updatedAt: team.updatedAt
            }));
            return this.commonService.generateSuccessResponse(returnData);
        }
        catch (error) {
            throw new common_1.HttpException('something went wrong', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async addTeam(teamData) {
        try {
            const newTeam = new this.teamModel(Object.assign({}, teamData));
            const team = await newTeam.save();
            const returnData = {
                id: team.id,
                name: team.name,
                users: team.users,
                products: team.products,
                createdAt: team.createdAt,
                updatedAt: team.updatedAt
            };
            return this.commonService.generateSuccessResponse([returnData]);
        }
        catch (error) {
            this.commonService.errorHandler(error);
        }
    }
    async getTeamById(teamId) {
        try {
            const team = await this.teamModel.findById(teamId).exec();
            if (team != null) {
                const returnData = {
                    id: team.id,
                    name: team.name,
                    users: team.users,
                    products: team.products,
                    createdAt: team.createdAt,
                    updatedAt: team.updatedAt
                };
                return this.commonService.generateSuccessResponse([returnData]);
            }
            throw new common_1.HttpException('Team not found', common_1.HttpStatus.NOT_FOUND);
        }
        catch (error) {
            this.commonService.errorHandler(error);
        }
    }
    async updateTeam(teamId, teamData) {
        try {
            const team = await this.teamModel.findById(teamId).exec();
            if (team != null) {
                const prevUserIds = team.users.map((user) => user.toString());
                const newUserIds = teamData.users || null;
                Object.assign(team, teamData);
                const updateTeam = await team.save();
                if (Array.isArray(newUserIds)) {
                    const { add, remove } = await this.commonService.changeable_ids(newUserIds, prevUserIds);
                    if (add.length)
                        await this.userModel.updateMany({ '_id': add }, { $addToSet: { teams: updateTeam.id } });
                    if (remove.length)
                        await this.userModel.updateMany({ '_id': remove }, { $pull: { teams: updateTeam.id } });
                }
                const returnData = {
                    id: updateTeam.id,
                    name: updateTeam.name,
                    users: updateTeam.users,
                    products: updateTeam.products,
                    createdAt: updateTeam.createdAt,
                    updatedAt: updateTeam.updatedAt
                };
                return this.commonService.generateSuccessResponse([returnData]);
            }
            throw new common_1.HttpException('Team not found', common_1.HttpStatus.NOT_FOUND);
        }
        catch (error) {
            this.commonService.errorHandler(error);
        }
    }
    async deleteTeam(teamId) {
        try {
            const team = await this.teamModel.findByIdAndDelete(teamId).exec();
            if (team != null) {
                await this.userModel.updateMany({ '_id': team.users }, { $pull: { teams: team.id } });
                const res = {
                    message: `${team.name} team has been deleted successfully`
                };
                return this.commonService.generateSuccessResponse([res]);
            }
            throw new common_1.HttpException('Team not found', common_1.HttpStatus.NOT_FOUND);
        }
        catch (error) {
            this.commonService.errorHandler(error);
        }
    }
};
TeamService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Team')),
    __param(1, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        common_service_1.CommonService])
], TeamService);
exports.TeamService = TeamService;
//# sourceMappingURL=team.service.js.map