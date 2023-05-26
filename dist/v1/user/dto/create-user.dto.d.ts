export declare class CreateUserDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    passwordConfirm: string;
    role: string;
    superAdmin: boolean;
    teams: [string];
    avatar: string;
}
