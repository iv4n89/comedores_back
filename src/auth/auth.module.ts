import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CommKitchenModule } from 'src/comm_place/comm_place.module';
import { LocalStrategy } from './local.strategy';
import { SessionSerializer } from './session-serializer';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, SessionSerializer],
  imports: [
    CommKitchenModule,
    PassportModule.register({ session: true }),
  ]
})
export class AuthModule {}
