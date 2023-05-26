import { CreateRoleDto } from './dto';
import { RoleService } from './role.service';
export declare class RoleController {
    private readonly roleService;
    constructor(roleService: RoleService);
    roleList(): Promise<{
        isSuccess: boolean;
        result: import("./interface").Role[];
    }>;
    addRole(createRoleDto: CreateRoleDto): Promise<{
        isSuccess: boolean;
        result: import("./interface").Role[];
    }>;
    roleById(roleId: string): Promise<{
        isSuccess: boolean;
        result: import("./interface").Role[];
    }>;
    editRole(updateRoleDto: CreateRoleDto, roleId: string): Promise<{
        isSuccess: boolean;
        result: import("./interface").Role[];
    }>;
    deleteRole(roleId: string): Promise<{
        isSuccess: boolean;
        result: {
            message: string;
        }[];
    }>;
}
