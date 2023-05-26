import { Model } from 'mongoose';
import { CommonService } from 'src/common/common.service';
import { UserService } from '../user/user.service';
import { CreateRoleDto } from './dto';
import { Role } from './interface';
export declare class RoleService {
    private roleModel;
    private readonly userService;
    private readonly commonService;
    constructor(roleModel: Model<Role>, userService: UserService, commonService: CommonService);
    roleList(): Promise<{
        isSuccess: boolean;
        result: Role[];
    }>;
    addRole(roleData: CreateRoleDto): Promise<{
        isSuccess: boolean;
        result: Role[];
    }>;
    roleById(roleId: string): Promise<{
        isSuccess: boolean;
        result: Role[];
    }>;
    editRole(roleId: string, roleData: CreateRoleDto): Promise<{
        isSuccess: boolean;
        result: Role[];
    }>;
    deleteRole(roleId: string): Promise<{
        isSuccess: boolean;
        result: {
            message: string;
        }[];
    }>;
}
