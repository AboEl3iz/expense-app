import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './auth-services/local-strategy/local-strategy.service';
import { SessionSerializer } from './auth-services/session-serializer/session-serializer.service';

@Module({
  providers: [AuthResolver, AuthService, SessionSerializer, LocalStrategy],
  imports: [UserModule,PassportModule.register({ session: true }),],
  
})
export class AuthModule {}
