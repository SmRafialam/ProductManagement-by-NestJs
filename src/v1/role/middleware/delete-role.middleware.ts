import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { UserService } from "src/v1/user/user.service";

@Injectable()
export class DeleteRoleMiddleware implements NestMiddleware {

    constructor(private readonly userService: UserService ) {}

    async use(req: Request, res: Response, next: NextFunction) {
        const roleId = req.params.id
        const forceDelete = req.query.forceDelete && req.query.forceDelete === 'true' ? true : false
        const users = await this.userService.getUsersByRoleId(roleId)
        if(Array.isArray(users) && users.length && !forceDelete) {
            throw new HttpException(
                "The role could not be removed because some users have been assigned to this role",
                HttpStatus.BAD_REQUEST
            )
        }
        next()
    }
}