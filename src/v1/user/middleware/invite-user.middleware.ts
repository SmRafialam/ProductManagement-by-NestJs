import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { UserService } from "src/v1/user/user.service";

@Injectable()
export class InviteUserMiddleware implements NestMiddleware {

    constructor(private readonly userService: UserService ) {}

    async use(req: Request, res: Response, next: NextFunction) {
        const {email} = req.body;
        const user = await this.userService.userDataOrNull(email);
        if(user !== null) {
            if(user.status === 'active') throw new HttpException("An active user already exist with the given email", HttpStatus.CONFLICT);
            req.body.role = user.role.toString();
            req.body.invitedUser = user;
        }
        next();
    }
}