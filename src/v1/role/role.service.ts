import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommonService } from 'src/common/common.service';
import { UserService } from '../user/user.service';
import { CreateRoleDto } from './dto';
import { Role } from './interface';

@Injectable()
export class RoleService {

    constructor(
        @InjectModel('Role') private roleModel: Model<Role>,
        private readonly userService: UserService,
        private readonly commonService: CommonService
    ){}

    async roleList(): Promise<{isSuccess: boolean, result: Role[]}> {
        try {
            const roles = await this.roleModel.find().sort({name:1}).populate('users').exec();
            const returnData = roles.map(role=> ({
                id: role.id,
                name: role.name,
                systemAdmin: role.systemAdmin,
                dashboard: role.dashboard,
                products: role.products,
                collections: role.collections,
                priceList: role.priceList,
                users: role.users.map((user: any)=>({
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
                }))
            })) as Role[];
            return this.commonService.generateSuccessResponse<Role[]>(returnData);
        }catch(error) {
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async addRole(roleData: CreateRoleDto): Promise<{isSuccess: boolean, result: Role[]}> {
        try {
            const newRole = new this.roleModel({
                ...roleData
            });
            const role = await newRole.save();
            const returnData = {
                id: role.id,
                name: role.name,
                systemAdmin: role.systemAdmin,
                dashboard: role.dashboard,
                products: role.products,
                collections: role.collections,
                priceList: role.priceList
            } as Role;
            return this.commonService.generateSuccessResponse<Role[]>([returnData]);
        }catch(error) {
            this.commonService.errorHandler(error);
        }
    }
    
    async roleById(roleId: string): Promise<{isSuccess: boolean, result: Role[]}> {
        try {
            const role = await this.roleModel.findById(roleId).exec();
            if(role != null) {
                const returnData = {
                    id: role.id,
                    name: role.name,
                    systemAdmin: role.systemAdmin,
                    dashboard: role.dashboard,
                    products: role.products,
                    collections: role.collections,
                    priceList: role.priceList,
                    users: role.users.map((user: any)=>({
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email
                    }))
                } as Role;
                return this.commonService.generateSuccessResponse<Role[]>([returnData]);
            }
            throw new HttpException('Role not found', HttpStatus.NOT_FOUND)
        }catch(error) {
            this.commonService.errorHandler(error);
        }
    }

    async editRole(roleId: string, roleData: CreateRoleDto): Promise<{isSuccess: boolean, result: Role[]}> {
        try {
            const role = await this.roleModel.findByIdAndUpdate(roleId, {
                ...roleData
            }, {new: true}).exec();
            if(role != null) {
                const returnData = {
                    id: role.id,
                    name: role.name,
                    systemAdmin: role.systemAdmin,
                    dashboard: role.dashboard,
                    products: role.products,
                    collections: role.collections,
                    priceList: role.priceList
                } as Role;
                return this.commonService.generateSuccessResponse<Role[]>([returnData]);
            }
            throw new HttpException('Role not found', HttpStatus.NOT_FOUND)
        }catch(error) {
            this.commonService.errorHandler(error);
        }
    }

    async deleteRole(roleId: string): Promise<{isSuccess: boolean, result: {message: string}[]}> {
        try {
            const role = await this.roleModel.findByIdAndDelete(roleId).exec()
            if(role != null) {
                await this.userService.setNullToUserRoleByRoleId(role.id);
                const res = {
                    message: `${role.name} role has been deleted successfully`
                };
                return this.commonService.generateSuccessResponse<{message: string}[]>([res]);
            }
            throw new HttpException('Role not found', HttpStatus.NOT_FOUND)
        }catch(error) {
            this.commonService.errorHandler(error);
        }
    }
}
