import { NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { TeamService } from "../team.service";
export declare class DeleteTeamMiddleware implements NestMiddleware {
    private readonly teamService;
    constructor(teamService: TeamService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
