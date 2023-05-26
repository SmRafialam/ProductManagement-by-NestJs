import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { CommonModule } from "src/common/common.module";
import { MailModule } from "src/mail/mail.module";
import { UserModule } from "../user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategy";
import { JwtRtStrategy } from "./strategy/jwt-rt.strategy";
import { TokenModule } from './token/token.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {expiresIn: process.env.JWT_EXPIRES_IN}
        }),
        MailModule,
        UserModule,
        TokenModule,
        CommonModule
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, JwtRtStrategy]
})
export class AuthModule {}