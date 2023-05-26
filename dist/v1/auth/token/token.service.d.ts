import { Model, Types } from 'mongoose';
import { UserService } from 'src/v1/user/user.service';
import { Token } from './interface';
export declare class TokenService {
    private tokenModel;
    private readonly userService;
    constructor(tokenModel: Model<Token>, userService: UserService);
    getUserToken(userId: string | Types.ObjectId): Promise<Token>;
    validateToken(userId: string | Types.ObjectId, token: string): Promise<boolean>;
    deleteToken(userId: string | Types.ObjectId, token: string): Promise<void>;
    deleteTokenByUserId(userId: string | Types.ObjectId): Promise<void>;
}
