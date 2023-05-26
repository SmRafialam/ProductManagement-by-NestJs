import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const InvitedUser = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const {invitedUser} = request.body;
        return data ? invitedUser?.[data] : invitedUser;
    }
);