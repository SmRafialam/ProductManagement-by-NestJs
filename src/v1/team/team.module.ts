import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from 'src/common/common.module';
import { userSchema } from '../user/schema';
import { DeleteTeamMiddleware } from './middleware/delete-team.middleware';
import { teamSchema } from './schema';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'Team', schema: teamSchema},
      {name: 'User', schema: userSchema}
    ]),
    CommonModule
  ],
  controllers: [TeamController],
  providers: [TeamService]
})
export class TeamModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(DeleteTeamMiddleware)
      .forRoutes({path: 'api/v1/team/:id', method: RequestMethod.DELETE})
  }
}
