import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { usersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { PrismaService } from 'src/database/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { tokenModule } from 'src/token/token.module';

@Module({
  imports: [
    usersModule, 
    PassportModule,
    tokenModule,
    JwtModule.register({
      secret : jwtConstants.secret,
      signOptions : {expiresIn: '60s'}
  })],
  providers: [AuthService, LocalStrategy, PrismaService],
  exports : [JwtModule, AuthService]
})
export class AuthModule {}
