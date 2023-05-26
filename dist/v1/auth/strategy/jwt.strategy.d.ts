import { Strategy } from "passport-jwt";
import { UserService } from "src/v1/user/user.service";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private userService;
    constructor(userService: UserService);
    validate(payload: {
        sub: string;
        email: string;
    }): Promise<import("../../user/interface").User>;
}
export {};
