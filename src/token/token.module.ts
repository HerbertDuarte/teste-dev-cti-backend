import { Module, forwardRef } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { AuthModule } from 'src/auth/auth.module';
import { tokenService } from './token.service';
import { TokenController } from './token.controller';
import { usersService } from 'src/users/users.service';
import { AuthService } from 'src/auth/auth.service';
import { usersModule } from 'src/users/users.module';

@Module({
  imports: [
    // forwardRef indica que a importação circular(dois módulos um importando o outro) será feita pelo auth modules, ele import ao usermodules
    forwardRef(()=>  AuthModule),
    usersModule,
  ],
  controllers: [TokenController],
  providers: [PrismaService, tokenService, usersService, AuthService],
  exports :[tokenService]
})
export class tokenModule {}