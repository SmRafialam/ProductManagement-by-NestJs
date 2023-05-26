import { Document, Types } from "mongoose";
import { Team } from "src/v1/team/interface";
import { userStatus } from "../enum";

export interface User extends Document {
    readonly id: string | Types.ObjectId
    readonly firstName: string
    readonly lastName: string
    readonly email: string
    readonly password?: string
    readonly role: object
    readonly superAdmin: boolean
    readonly teams: string[] | Types.ObjectId[] | Team[]
    readonly avatar: string
    readonly refreshToken?: string
    status: userStatus
    readonly createdAt: string
    readonly updatedAt: string
}