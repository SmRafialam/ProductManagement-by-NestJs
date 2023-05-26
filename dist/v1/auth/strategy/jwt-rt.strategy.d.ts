import { Request } from "express";
import { Strategy } from "passport-jwt";
import { UserService } from "src/v1/user/user.service";
declare const JwtRtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtRtStrategy extends JwtRtStrategy_base {
    private userService;
    constructor(userService: UserService);
    validate(req: Request, payload: {
        sub: string;
        email: string;
    }): Promise<{
        id: string | import("mongoose").Types.ObjectId;
        email: string;
        refreshToken: string;
    }>;
}
export {};
