import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { randomBytes } from 'crypto';
import { Model, Types } from 'mongoose';
import { UserService } from 'src/v1/user/user.service';
import { Token } from './interface';

@Injectable()
export class TokenService {
    constructor(
        @InjectModel('Token') private tokenModel: Model<Token>,
        private readonly userService: UserService
    ){}

    async getUserToken(userId: string | Types.ObjectId): Promise<Token> {
        try {
            let token = await this.tokenModel.findOne({userId: userId})
            if (!token) {
                token = await new this.tokenModel({
                    userId: userId,
                    token: randomBytes(32).toString("hex"),
                }).save();
            }
            const returnData = {
                userId: token.userId,
                token: token.token,
            }
            return returnData as Token
        }catch (error) {
            throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async validateToken(userId: string | Types.ObjectId, token: string): Promise<boolean> {
        const user = await this.userService.userDataOrNull(userId)
        if(!user) throw new HttpException('Invalid link or expired', HttpStatus.BAD_REQUEST)
        try {
            const data = await this.tokenModel.findOne({
                userId: userId,
                token: token,
            }).exec()
            return data !== null ? true : false
        }catch(error) {
            throw new HttpException('Invalid link or expired', HttpStatus.BAD_REQUEST)
        }
    }

    async deleteToken(userId: string | Types.ObjectId, token: string): Promise<void> {
        try {
            await this.tokenModel.deleteOne({
                userId: userId,
                token: token,
            }).exec()
        }catch(error) {
            throw new HttpException('Something went wrong ', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async deleteTokenByUserId(userId: string | Types.ObjectId): Promise<void> {
        try {
            await this.tokenModel.deleteOne({
                userId: userId,
            }).exec()
        }catch(error) {
            throw new HttpException('Something went wrong ', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    } 
}
