import { HttpException, HttpStatus, Injectable, Inject, forwardRef } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import * as bcrypt from 'bcrypt';
import * as argon2 from "argon2";
import { ConfirmInvitationDto, CreateUserDto, UpdateUserDto, UserProfileDto, UserSettingsDto } from "./dto";
import { User } from "./interface";
import { Team } from "../team/interface";
import { Role } from "../role/interface";
import { CommonService } from "src/common/common.service";
import { TokenService } from "../auth/token/token.service";
import { MailService } from "src/mail/mail.service";
import { userStatus } from "./enum";

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private userModel: Model<User>,
        @InjectModel('Team') private teamModel: Model<Team>,
        @InjectModel('Role') private roleModel: Model<Role>,
        @Inject(forwardRef(() => TokenService))
        private readonly tokenService: TokenService,
        private readonly commonService: CommonService,
        private readonly mailService: MailService
    ) {}

    async createSuperUser(): Promise<{isSuccess: boolean, result: {message: string}[]}> {
        try {
            const superUser = await this.userModel.findOne({email: process.env.SUPER_USER_EMAIL}).exec();
            if(superUser != null) {
                throw new HttpException('Super user already exist', HttpStatus.CONFLICT);
            }
            const encodedPassword = await bcrypt.hash(process.env.SUPER_USER_PASSWORD, 10)
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
            return this.commonService.generateSuccessResponse<{message: string}[]>([res]);
        }catch(error) {
            this.commonService.errorHandler(error);
        }
        
    }
    
    async getUsers(): Promise<{isSuccess: boolean, result: User[]}> {
        try {
            const users = await this.userModel.find().sort({firstName:1}).exec()
            const returnData = users.map(user=> ({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                superAdmin: user.superAdmin,
                teams: user.teams,
                avatar: user.avatar,
                status: user.status
            })) as User[];
            return this.commonService.generateSuccessResponse<User[]>(returnData);
        }catch(error) {
            this.commonService.errorHandler(error);
        }
    }

    async addUser(userData: CreateUserDto): Promise<{isSuccess: boolean, result: User[]}> {
        try {
            if(userData.password) {
                userData.password = await bcrypt.hash(userData.password, 10)
                delete userData['passwordConfirm']
            }
            const user = new this.userModel({
                ...userData
            })
            const createdUser  = await user.save()
            await this.teamModel.updateMany({'_id': createdUser.teams}, {$push: {users: createdUser.id}})
            await this.roleModel.updateOne({'_id': createdUser.role}, {$push: {users: createdUser.id}})
            const returnData = {
                id: createdUser.id,
                firstName: createdUser.firstName,
                lastName: createdUser.lastName,
                email: createdUser.email
            } as User;
            return this.commonService.generateSuccessResponse<User[]>([returnData]);
        }catch(error) {
            this.commonService.errorHandler(error);
        }
    }

    async getUser(userId: string): Promise<{isSuccess: boolean, result: User[]}> {
        try {
            const user = await this.userModel.findById(userId).populate({path: 'role', select: '-_id -__v -users'}).exec();
            if(user != null) {
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
                } as User;
                return this.commonService.generateSuccessResponse<User[]>([returnData]);
            }
            throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        }catch(error) {
            this.commonService.errorHandler(error);
        }
    }

    async getUserByEmailId(email: string): Promise<{isSuccess: boolean, result: User[]}> {
        try {
            const user = await this.userModel.findOne({email: email}).exec();
            if(user != null) {
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
                } as User;
                return this.commonService.generateSuccessResponse<User[]>([returnData]);
            }
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }catch(error) {
            this.commonService.errorHandler(error);
        }
    }

    async validateUser(email: string, password: string): Promise<{isSuccess: boolean, result: User[]}> {
        try {
            const user = await this.userModel.findOne({email: email}).exec()
            if(!user) throw new HttpException('Authentication error', HttpStatus.FORBIDDEN)
            const matched = await bcrypt.compare(password, user.password)
            if(!matched) throw new HttpException('Authentication error', HttpStatus.FORBIDDEN)
            const returnData = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            } as User
            return this.commonService.generateSuccessResponse<User[]>([returnData]);
        }catch(error) {
            this.commonService.errorHandler(error);
        }
    }

    async editUser(userId: string, userData: UpdateUserDto): Promise<{isSuccess: boolean, result: User[]}> {
        try {
            const user = await this.userModel.findById(userId).exec()
            if(user != null) {
                const prevTeamIds = user.teams.map((team: any)=>team.toString())
                const newTeamIds= userData.teams || null
                const newRoleId = userData.role || null
                const prevRoleId = user.role ? user.role.toString() : ''
                if(userData.password) {
                    userData.password = await bcrypt.hash(userData.password, 10)
                    delete userData['passwordConfirm']
                }
                const updateUser = await this.userModel.findByIdAndUpdate(userId, {
                    ...userData
                }, {new: true}).exec()
                if(Array.isArray(newTeamIds)) {
                    const {add, remove} = await this.commonService.changeable_ids(newTeamIds, prevTeamIds)
                    if(add.length) await this.teamModel.updateMany({'_id': add}, {$addToSet: {users: updateUser.id}})
                    if(remove.length) await this.teamModel.updateMany({'_id': remove}, {$pull: {users: updateUser.id}})
                }
                if(newRoleId != null && newRoleId !== prevRoleId) {
                    if(newRoleId) await this.roleModel.updateOne({'_id': newRoleId}, {$addToSet: {users: updateUser.id}})
                    if(prevRoleId) await this.roleModel.updateOne({'_id': prevRoleId}, {$pull: {users: updateUser.id}})
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
                } as User;
                return this.commonService.generateSuccessResponse<User[]>([returnData]);
            }
            throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        }catch(error) {
            this.commonService.errorHandler(error);
        }
    }

    async userSettings(userId: string, userData: UserSettingsDto): Promise<{isSuccess: boolean, result: User[]}> {
        try {
            const user = await this.userModel.findById(userId).exec()
            if(user != null) {
                const prevTeamIds = user.teams.map((team: any)=>team.toString())
                const newTeamIds= userData.teams || null
                const newRoleId = userData.role || null
                const prevRoleId = user.role ? user.role.toString() : ''

                const updateUser = await this.userModel.findByIdAndUpdate(userId, {
                    ...userData
                }, {new: true}).exec()
                if(Array.isArray(newTeamIds)) {
                    const {add, remove} = await this.commonService.changeable_ids(newTeamIds, prevTeamIds)
                    if(add.length) await this.teamModel.updateMany({'_id': add}, {$addToSet: {users: updateUser.id}})
                    if(remove.length) await this.teamModel.updateMany({'_id': remove}, {$pull: {users: updateUser.id}})
                }

                if(newRoleId != null && newRoleId !== prevRoleId) {
                    if(newRoleId) await this.roleModel.updateOne({'_id': newRoleId}, {$addToSet: {users: updateUser.id}})
                    if(prevRoleId) await this.roleModel.updateOne({'_id': prevRoleId}, {$pull: {users: updateUser.id}})
                }

                const returnData = {
                    id: updateUser.id,
                    email: updateUser.email,
                    role: updateUser.role,
                    teams: updateUser.teams,
                } as User;
                return this.commonService.generateSuccessResponse<User[]>([returnData]);
            }
            throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        }catch(error) {
            this.commonService.errorHandler(error);
        }
    }

    async updateUserProfile(userId: string | Types.ObjectId, userData: UserProfileDto): Promise<{isSuccess: boolean, result: User[]}> {
        try {
            const user = await this.userModel.findById(userId).exec()
            if(user != null) {
                if(userData.password) {
                    userData.password = await bcrypt.hash(userData.password, 10)
                    delete userData['passwordConfirm']
                }
                const updateUser = await this.userModel.findByIdAndUpdate(userId, {
                    ...userData
                }, {new: true}).exec()
                const returnData = {
                    id: updateUser.id,
                    firstName: updateUser.firstName,
                    lastName: updateUser.lastName,
                    email: updateUser.email,
                    avatar: updateUser.avatar,
                } as User;
                return this.commonService.generateSuccessResponse<User[]>([returnData]);
            }
            throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        }catch(error) {
            this.commonService.errorHandler(error);
        }
    }

    async changePassword(userId: string, password: string): Promise<void> {
        try {
            const hashed = await bcrypt.hash(password, 10)
            await this.userModel.updateOne({'_id': userId}, {$set: {password: hashed}}).exec()
        }catch(error) {
            this.commonService.errorHandler(error);
        }
    }

    async deleteUser(userId: string): Promise<{isSuccess: boolean, result: {message: string}[]}> {
        try {
            const user = await this.userModel.findById(userId).exec()
            if(user != null) {
                await this.teamModel.updateMany({'_id': user.teams}, {$pull: {users: user.id}})
                await this.roleModel.updateOne({'_id': user.role}, {$pull: {users: user.id}})
                if(user.superAdmin) throw new HttpException("You don't have the permission", HttpStatus.UNAUTHORIZED)
                await this.userModel.findByIdAndDelete(userId).exec();
                const res = {
                    message: `${user.firstName} ${user.lastName} user has been deleted successfully`
                };
                return this.commonService.generateSuccessResponse<{message: string}[]>([res]);
            }
            throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        }catch(error) {
            this.commonService.errorHandler(error);
        }
    }

    async setNullToUserRoleByRoleId(roleId: string | Types.ObjectId): Promise<void>{
        try {
            await this.userModel.updateMany({role: roleId}, {$set: {role: null}})
        }catch(error) {
            this.commonService.errorHandler(error);
        }
    }

    async getUsersByRoleId(roleId: string): Promise<{isSuccess: boolean, result: User[]}> {
        try {
            const users = await this.userModel.find({role: roleId})
            const returnData = users.map(user=> ({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                status: user.status
            })) as User[]
            return this.commonService.generateSuccessResponse<User[]>(returnData);
        }catch(error) {
            this.commonService.errorHandler(error);
        }
    }
    
    async setRefreshToken(userId: string | Types.ObjectId, rfToken: string): Promise<void> {
        try {
            const hashedToken = await argon2.hash(rfToken)
            await this.userModel.findByIdAndUpdate(userId, {refreshToken: hashedToken}).exec()
        }catch(error) {
            this.commonService.errorHandler(error);
        }
    }

    async getRefreshToken(userId: string): Promise<{isSuccess: boolean, result: {id: string | Types.ObjectId, email: string, refreshToken: string}[]}> {
        try {
            const user = await this.userModel.findById(userId).select('refreshToken email').exec();
            const res = {
                id: user.id, 
                email: user.email, 
                refreshToken: user.refreshToken
            };
            return this.commonService.generateSuccessResponse<{id: string | Types.ObjectId, email: string, refreshToken: string}[]>([res]);
        }catch(error) {
            this.commonService.errorHandler(error);
        }
    }

    async userInvitation(createData: CreateUserDto, user: User): Promise<{isSuccess: boolean, result: {message: string}[]}> {

        let userId: string | Types.ObjectId
        if(user !== undefined) {
            userId = user.id
            await this.userModel.updateOne({_id: userId}, {$set: {status: userStatus.invited}})
        }else {
            const {result} = await this.addUser(createData);
            const newUser = result[0];
            userId = newUser.id
        }
        const token = await this.tokenService.getUserToken(userId)
        const link = `${process.env.BASE_URL}/invitation/?id=${userId}&token=${token.token}`
        const {accepted} = await this.mailService.sendInvitation(createData.email, "PIM Invitation", link)
        if(Array.isArray(accepted) && accepted.length){
            const res = {
                message: `Invitation link sent to the email account`
            };
            return this.commonService.generateSuccessResponse<{message: string}[]>([res]);
        }
        throw new HttpException('An error occured', HttpStatus.INTERNAL_SERVER_ERROR)
    }

    async confirmInvitation(userId: string, token: string, invitedUser: ConfirmInvitationDto): Promise<{isSuccess: boolean, result: {message: string}[]}> {
        const isValid = await this.tokenService.validateToken(userId, token)
        if(!isValid) throw new HttpException('Invalid link or expired', HttpStatus.BAD_REQUEST)
        invitedUser.password = await bcrypt.hash(invitedUser.password, 10)
        delete invitedUser['passwordConfirm']
        await this.userModel.findByIdAndUpdate(userId, {
            ...invitedUser,
            status: userStatus.active
        })
        await this.tokenService.deleteToken(userId, token);
        const res = {
            message: `User invitation has been confirmed`
        };
        return this.commonService.generateSuccessResponse<{message: string}[]>([res]);
    }

    async rollbackInvitation(id: string): Promise<{isSuccess: boolean, result: {message: string}[]}> {
        try {
            let text = '';
            const user = await this.userModel.findById(id).exec()
            if(user && user.status === 'invited') {
                user.status = userStatus.invitation_cancelled
                await user.save()
                await this.tokenService.deleteTokenByUserId(id)
                text = 'Invitation cancelled';
            }else {
                text = 'Not a invited user';
            }
            const res = { message:  text};
            return this.commonService.generateSuccessResponse<{message: string}[]>([res]);
        }catch(error) {
            throw new HttpException(error, error?.status)
        }
    }

    async userDataOrNull(uniqueId: string | Types.ObjectId) {
        try {
            const queryFilter: object[] = [{email: uniqueId}]
            if(Types.ObjectId.isValid(uniqueId)) queryFilter.push({_id: uniqueId})
            const user = await this.userModel.findOne({
                $or: queryFilter
            })
            if(user !== null) {
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
                }
                return returnData as User
            }
            return null
        }catch(error) {
            this.commonService.errorHandler(error);
        }
    }
}