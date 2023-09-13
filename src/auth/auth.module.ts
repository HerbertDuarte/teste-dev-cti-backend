import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { usersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { PrismaService } from 'src/database/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
  imports: [
    usersModule, 
    PassportModule,
    JwtModule.register({
      global : true,
      secret : jwtConstants.secret,
      signOptions : {expiresIn: '30d'}
  })],
  providers: [AuthService, LocalStrategy, PrismaService],
  exports : [JwtModule, AuthService]
})
export class AuthModule {}
