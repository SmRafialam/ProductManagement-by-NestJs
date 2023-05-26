import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { roleSchema } from './schema';
import { UserModule } from '../user/user.module';
import { DeleteRoleMiddleware } from './middleware/delete-role.middleware';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Role', schema: roleSchema}]),
    UserModule,
    CommonModule
  ],
  providers: [RoleService],
  controllers: [RoleController]
})
export class RoleModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(DeleteRoleMiddleware)
      .forRoutes({path: 'api/v1/role/:id', method: RequestMethod.DELETE})
  }
}
