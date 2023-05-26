import { Body, Controller, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { User } from "./decorator";
import { LoginDto, ManagePasswordDto, ResetDto } from "./dto";
import { JwtRtAuthGuard } from "./guard";

@ApiTags('auth')
@Controller()
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('login')
    login(@Body() loginDto: LoginDto) {
        return this.authService.        login(loginDto)
    }

    @Post('super-user')
    superUser() {
        return this.authService.superUser()
    }

    @UseGuards(JwtRtAuthGuard)
    @ApiBearerAuth('Refresh auth')
    @Get('refresh-token')
    newAccessToken(
        @User('id') userId: string,
        @User('email') email: string
    ) {
        return this.authService.generateTokens(userId, email)
    }

    @Post('recovery/password')
    resetPassword(@Body() resetDto: ResetDto) {
        return this.authService.resetPassword(resetDto.email)
    }

    @Post('reset/password/:id/:token')
    managePassword(@Body() passwordDto: ManagePasswordDto, @Param('id') id: string, @Param('token') token: string) {
        return this.authService.managePassword(id, token, passwordDto.password)
    }

    @Get('validation/token')
    verifyLink(@Query('id') id: string, @Query('token') token: string) {
        return this.authService.verifyLink(id, token)
    }

}