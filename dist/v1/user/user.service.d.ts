import { Model, Types } from "mongoose";
import { ConfirmInvitationDto, CreateUserDto, UpdateUserDto, UserProfileDto, UserSettingsDto } from "./dto";
import { User } from "./interface";
import { Team } from "../team/interface";
import { Role } from "../role/interface";
import { CommonService } from "src/common/common.service";
import { TokenService } from "../auth/token/token.service";
import { MailService } from "src/mail/mail.service";
export declare class UserService {
    private userModel;
    private teamModel;
    private roleModel;
    private readonly tokenService;
    private readonly commonService;
    private readonly mailService;
    constructor(userModel: Model<User>, teamModel: Model<Team>, roleModel: Model<Role>, tokenService: TokenService, commonService: CommonService, mailService: MailService);
    createSuperUser(): Promise<{
        isSuccess: boolean;
        result: {
            message: string;
        }[];
    }>;
    getUsers(): Promise<{
        isSuccess: boolean;
        result: User[];
    }>;
    addUser(userData: CreateUserDto): Promise<{
        isSuccess: boolean;
        result: User[];
    }>;
    getUser(userId: string): Promise<{
        isSuccess: boolean;
        result: User[];
    }>;
    getUserByEmailId(email: string): Promise<{
        isSuccess: boolean;
        result: User[];
    }>;
    validateUser(email: string, password: string): Promise<{
        isSuccess: boolean;
        result: User[];
    }>;
    editUser(userId: string, userData: UpdateUserDto): Promise<{
        isSuccess: boolean;
        result: User[];
    }>;
    userSettings(userId: string, userData: UserSettingsDto): Promise<{
        isSuccess: boolean;
        result: User[];
    }>;
    updateUserProfile(userId: string | Types.ObjectId, userData: UserProfileDto): Promise<{
        isSuccess: boolean;
        result: User[];
    }>;
    changePassword(userId: string, password: string): Promise<void>;
    deleteUser(userId: string): Promise<{
        isSuccess: boolean;
        result: {
            message: string;
        }[];
    }>;
    setNullToUserRoleByRoleId(roleId: string | Types.ObjectId): Promise<void>;
    getUsersByRoleId(roleId: string): Promise<{
        isSuccess: boolean;
        result: User[];
    }>;
    setRefreshToken(userId: string | Types.ObjectId, rfToken: string): Promise<void>;
    getRefreshToken(userId: string): Promise<{
        isSuccess: boolean;
        result: {
            id: string | Types.ObjectId;
            email: string;
            refreshToken: string;
        }[];
    }>;
    userInvitation(createData: CreateUserDto, user: User): Promise<{
        isSuccess: boolean;
        result: {
            message: string;
        }[];
    }>;
    confirmInvitation(userId: string, token: string, invitedUser: ConfirmInvitationDto): Promise<{
        isSuccess: boolean;
        result: {
            message: string;
        }[];
    }>;
    rollbackInvitation(id: string): Promise<{
        isSuccess: boolean;
        result: {
            message: string;
        }[];
    }>;
    userDataOrNull(uniqueId: string | Types.ObjectId): Promise<User>;
}
