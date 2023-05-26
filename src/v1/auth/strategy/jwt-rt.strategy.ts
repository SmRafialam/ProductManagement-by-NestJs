import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import * as argon2 from "argon2";
import { UserService } from "src/v1/user/user.service";

@Injectable()
export class JwtRtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor(private userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_RT_SECRET,
            passReqToCallback: true
        })
    }

    async validate(req: Request, payload: {sub: string, email: string}) {
        const {result} = await this.userService.getRefreshToken(payload.sub);
        const user = result[0];
        if(!user || !user.refreshToken) return null
        const reqToken = req.headers.authorization.replace('Bearer', '').trim()
        const matched = await argon2.verify(user.refreshToken, reqToken)
        if(!matched) return null
        return user
    }
}