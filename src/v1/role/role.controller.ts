import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard';
import { CreateRoleDto } from './dto';
import { RoleService } from './role.service';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth('API auth')
@ApiTags('role')
@Controller()
export class RoleController {
    constructor(private readonly roleService: RoleService) {}

    @Get()
    roleList() {
        return this.roleService.roleList()
    }
    
    @Post()
    addRole(@Body() createRoleDto: CreateRoleDto) {
        return this.roleService.addRole(createRoleDto)
    }

    @Get(':id')
    roleById(@Param('id') roleId: string) {
        return this.roleService.roleById(roleId)
    }

    @Patch(':id')
    editRole(@Body() updateRoleDto: CreateRoleDto, @Param('id') roleId: string) {
        return this.roleService.editRole(roleId, updateRoleDto)
    }

    @Delete(':id')
    deleteRole(@Param('id') roleId: string) {
        return this.roleService.deleteRole(roleId)
    }

}
