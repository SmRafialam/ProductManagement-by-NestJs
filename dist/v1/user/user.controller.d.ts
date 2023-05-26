import { ConfirmInvitationDto, CreateUserDto, UpdateUserDto, UserProfileDto, UserSettingsDto } from "./dto";
import { User as UserEntity } from "./interface/user.interface";
import { UserService } from "./user.service";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUsers(): Promise<{
        isSuccess: boolean;
        result: UserEntity[];
    }>;
    getUserInfo(user: UserEntity): Promise<{
        isSuccess: boolean;
        result: UserEntity[];
    }>;
    addUser(createUserDto: CreateUserDto): Promise<{
        isSuccess: boolean;
        result: UserEntity[];
    }>;
    createSuperUser(): Promise<{
        isSuccess: boolean;
        result: {
            message: string;
        }[];
    }>;
    updateUserProfile(userProfileDto: UserProfileDto, user: UserEntity): Promise<{
        isSuccess: boolean;
        result: UserEntity[];
    }>;
    userInvitation(createUserDto: CreateUserDto, invitedUser: UserEntity): Promise<{
        isSuccess: boolean;
        result: {
            message: string;
        }[];
    }>;
    confirmInvitation(invitedUserDto: ConfirmInvitationDto, id: string, token: string): Promise<{
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
    getUser(userId: string): Promise<{
        isSuccess: boolean;
        result: UserEntity[];
    }>;
    editUser(userId: string, updateUserDto: UpdateUserDto): Promise<{
        isSuccess: boolean;
        result: UserEntity[];
    }>;
    userSettings(userId: string, userSettingsDto: UserSettingsDto): Promise<{
        isSuccess: boolean;
        result: UserEntity[];
    }>;
    deleteUser(userId: string): Promise<{
        isSuccess: boolean;
        result: {
            message: string;
        }[];
    }>;
}
