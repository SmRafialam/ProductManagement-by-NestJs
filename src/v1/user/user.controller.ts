import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { User } from "../auth/decorator";
import { JwtAuthGuard } from "../auth/guard";
import { InvitedUser } from "./decorator";
import { ConfirmInvitationDto, CreateUserDto, UpdateUserDto, UserProfileDto, UserSettingsDto } from "./dto";
import { User as UserEntity } from "./interface/user.interface";
import { UserService } from "./user.service";

@UseGuards(JwtAuthGuard)
@ApiBearerAuth('API auth')
@ApiTags('user')
@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    getUsers() {
        return this.userService.getUsers()
    }

    @Get('info')
    getUserInfo(@User() user: UserEntity) {
        return this.userService.getUser(user.id.toString())
    }

    @Post()
    addUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.addUser(createUserDto)
    }

    @Post('super-user')
    createSuperUser() {
        return this.userService.createSuperUser()
    }

    @Patch('profile')
    updateUserProfile(
        @Body() userProfileDto: UserProfileDto,
        @User() user: UserEntity
    ) {
        return this.userService.updateUserProfile(user.id, userProfileDto)
    }

    @Post('invitation')
    async userInvitation(
        @Body() createUserDto: CreateUserDto,
        @InvitedUser() invitedUser: UserEntity
    ) {
        return await this.userService.userInvitation(createUserDto, invitedUser)
    }

    @Post('invitation/:id/:token')
    async confirmInvitation(@Body() invitedUserDto: ConfirmInvitationDto, @Param('id') id: string, @Param('token') token: string) {
        return await this.userService.confirmInvitation(id, token, invitedUserDto)
    }

    @Delete('invitation/:id')
    async rollbackInvitation(@Param('id') id: string) {
        return await this.userService.rollbackInvitation(id)
    }

    @Get(':id')
    getUser(@Param('id') userId: string) {
        return this.userService.getUser(userId)
    }

    @Put(':id')
    editUser(@Param('id') userId: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.editUser(userId, updateUserDto)
    }

    @Patch(':id')
    userSettings(@Param('id') userId: string, @Body() userSettingsDto: UserSettingsDto) {
        return this.userService.userSettings(userId, userSettingsDto)
    }

    @Delete(':id')
    deleteUser(@Param('id') userId: string) {
        return this.userService.deleteUser(userId)
    }
}