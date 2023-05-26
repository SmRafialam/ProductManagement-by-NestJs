import { JwtService } from "@nestjs/jwt";
import { Types } from "mongoose";
import { CommonService } from "src/common/common.service";
import { MailService } from "src/mail/mail.service";
import { UserService } from "../user/user.service";
import { LoginDto } from "./dto";
import { TokenService } from "./token/token.service";
import { Token } from "./type";
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    private readonly tokenService;
    private readonly mailService;
    private readonly commonService;
    constructor(userService: UserService, jwtService: JwtService, tokenService: TokenService, mailService: MailService, commonService: CommonService);
    login(loginDto: LoginDto): Promise<Token>;
    superUser(): Promise<{
        isSuccess: boolean;
        result: {
            message: string;
        }[];
    }>;
    generateTokens(userId: string | Types.ObjectId, email: string): Promise<Token>;
    resetPassword(email: string): Promise<{
        isSuccess: boolean;
        result: {
            message: string;
        }[];
    }>;
    managePassword(userId: string, token: string, password: string): Promise<{
        isSuccess: boolean;
        result: {
            message: string;
        }[];
    }>;
    verifyLink(userId: string, token: string): Promise<{
        isSuccess: boolean;
        result: {
            message: string;
        }[];
    }>;
}
