import { forwardRef, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from 'src/common/common.module';
import { MailModule } from 'src/mail/mail.module';
import { TokenModule } from '../auth/token/token.module';
import { roleSchema } from '../role/schema';
import { teamSchema } from '../team/schema';
import { InviteUserMiddleware } from './middleware';
import { userSchema } from './schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forFeature([
            {name: 'User', schema: userSchema},
            {name: 'Team', schema: teamSchema},
            {name: 'Role', schema: roleSchema}
        ]),
        CommonModule,
        MailModule,
        forwardRef(() => TokenModule),
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
        .apply(InviteUserMiddleware)
        .forRoutes({path: 'api/v1/user/invitation', method: RequestMethod.POST})
    }
}
