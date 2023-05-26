import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/database/prisma.service';
import { AuthService } from './auth.service';
import { localStrategy } from './local.strategy';
import { usersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { usersService } from 'src/users/users.service';

@Module({
  imports : [
    PassportModule.register({ defaultStrategy: 'local' }),
    usersModule
  ],
  controllers: [AuthController],
  providers: [AuthService, localStrategy, PrismaService],
})
export class authModule {}