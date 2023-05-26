import { AuthService } from "./auth.service";
import { LoginDto, ManagePasswordDto, ResetDto } from "./dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<import("./type").Token>;
    superUser(): Promise<{
        isSuccess: boolean;
        result: {
            message: string;
        }[];
    }>;
    newAccessToken(userId: string, email: string): Promise<import("./type").Token>;
    resetPassword(resetDto: ResetDto): Promise<{
        isSuccess: boolean;
        result: {
            message: string;
        }[];
    }>;
    managePassword(passwordDto: ManagePasswordDto, id: string, token: string): Promise<{
        isSuccess: boolean;
        result: {
            message: string;
        }[];
    }>;
    verifyLink(id: string, token: string): Promise<{
        isSuccess: boolean;
        result: {
            message: string;
        }[];
    }>;
}
