import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/v1/user/user.module';
import { tokenSchema } from './schema';
import { TokenService } from './token.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'Token', schema: tokenSchema}
    ]),
    forwardRef(() => UserModule),
  ],
  providers: [TokenService],
  exports: [TokenService]
})
export class TokenModule {}
