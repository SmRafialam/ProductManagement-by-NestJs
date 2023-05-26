import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommonService } from 'src/common/common.service';
import { User } from '../user/interface';
import { CreateTeamDto, UpdateTeamDto } from './dto';
import { Team } from './interface';

@Injectable()
export class TeamService {
    constructor(
        @InjectModel('Team') private teamModel: Model<Team>,
        @InjectModel('User') private userModel: Model<User>,
        private readonly commonService: CommonService
    ) {}

    async getTeamList(): Promise<{isSuccess: boolean, result: Team[]}> {
        try {
            const teams = await this.teamModel.find().sort({name:1}).populate('users').exec()
            const returnData = teams.map(team=> ({
                id: team.id,
                name: team.name,
                users: team.users.map((user: any)=>({
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
                })),
                products: team.products,
                createdAt: team.createdAt,
                updatedAt: team.updatedAt
            })) as Team[];
            return this.commonService.generateSuccessResponse<Team[]>(returnData);
        }catch(error) {
            throw new HttpException('something went wrong', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async addTeam(teamData: CreateTeamDto): Promise<{isSuccess: boolean, result: Team[]}> {
        try {
            const newTeam = new this.teamModel({
                ...teamData
            });
            const team = await newTeam.save();
            // await this.userModel.updateMany({'_id': team.users}, {$push: {teams: team.id}})
            const returnData = {
                id: team.id,
                name: team.name,
                users: team.users,
                products: team.products,
                createdAt: team.createdAt,
                updatedAt: team.updatedAt
            } as Team
            return this.commonService.generateSuccessResponse<Team[]>([returnData]);
        }catch(error) {
            this.commonService.errorHandler(error);
        }
    }

    async getTeamById(teamId: string): Promise<{isSuccess: boolean, result: Team[]}> {
        try {
            const team = await this.teamModel.findById(teamId).exec();
            if(team != null) {
                const returnData = {
                    id: team.id,
                    name: team.name,
                    users: team.users,
                    products: team.products,
                    createdAt: team.createdAt,
                    updatedAt: team.updatedAt
                } as Team;
                return this.commonService.generateSuccessResponse<Team[]>([returnData]);
            }
            throw new HttpException('Team not found', HttpStatus.NOT_FOUND)
        }catch(error) {
            this.commonService.errorHandler(error);
        }
    }

    async updateTeam(teamId: string, teamData: UpdateTeamDto): Promise<{isSuccess: boolean, result: Team[]}> {
        try {
            const team = await this.teamModel.findById(teamId).exec()
            if(team != null) {
                const prevUserIds = team.users.map((user: any)=>user.toString())
                const newUserIds= teamData.users || null
                Object.assign(team, teamData)
                const updateTeam = await team.save()
                if(Array.isArray(newUserIds)) {
                    const {add, remove} = await this.commonService.changeable_ids(newUserIds, prevUserIds)
                    if(add.length) await this.userModel.updateMany({'_id': add}, {$addToSet: {teams: updateTeam.id}})
                    if(remove.length) await this.userModel.updateMany({'_id': remove}, {$pull: {teams: updateTeam.id}})
                }
                const returnData = {
                    id: updateTeam.id,
                    name: updateTeam.name,
                    users: updateTeam.users,
                    products: updateTeam.products,
                    createdAt: updateTeam.createdAt,
                    updatedAt: updateTeam.updatedAt
                } as Team;
                return this.commonService.generateSuccessResponse<Team[]>([returnData]);
            }
            throw new HttpException('Team not found', HttpStatus.NOT_FOUND)

        }catch(error) {
            this.commonService.errorHandler(error);
        }
    }

    async deleteTeam(teamId: string): Promise<{isSuccess: boolean, result: {message: string}[]}> {
        try {
            const team = await this.teamModel.findByIdAndDelete(teamId).exec()
            if(team != null) {
                await this.userModel.updateMany({'_id': team.users}, {$pull: {teams: team.id}})
                const res = {
                    message: `${team.name} team has been deleted successfully`
                };
                return this.commonService.generateSuccessResponse<{message: string}[]>([res]);
            }
            throw new HttpException('Team not found', HttpStatus.NOT_FOUND)
        }catch(error) {
            this.commonService.errorHandler(error);
        }
    }
}
