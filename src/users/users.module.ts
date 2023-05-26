import { Module } from '@nestjs/common';
import { usersController} from './users.controller';
import { PrismaService } from 'src/database/prisma.service';
import { usersService } from './users.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'local' }),
  ],
  controllers: [usersController],
  providers: [PrismaService, usersService],
  exports :[usersService]
})
export class usersModule {}