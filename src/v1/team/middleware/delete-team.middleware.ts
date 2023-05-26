import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { TeamService } from "../team.service";

@Injectable()
export class DeleteTeamMiddleware implements NestMiddleware {

    constructor(private readonly teamService: TeamService ) {}

    async use(req: Request, res: Response, next: NextFunction) {
        const teamId = req.params.id
        const forceDelete = req.query.forceDelete && req.query.forceDelete === 'true' ? true : false
        const {result} = await this.teamService.getTeamById(teamId);
        const team = result[0];
        const userIds = team.users.map(user=> user.toString())
        if(Array.isArray(userIds) && userIds.length && !forceDelete) {
            throw new HttpException(
                "The team could not be removed because some users have been assigned to this team",
                HttpStatus.CONFLICT
            )
        }
        next()
    }
}