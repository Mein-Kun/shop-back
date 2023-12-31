import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './local.strategy';
import { SessionSerializer } from './session.serializer';
import { PassportModule } from '@nestjs/passport';
import { JwtModule} from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';


@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: "erg34KD:SK*D.D))xfgh",
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, LocalStrategy, SessionSerializer, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
