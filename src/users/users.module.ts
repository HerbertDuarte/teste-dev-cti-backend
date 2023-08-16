import { Module, forwardRef } from '@nestjs/common';
import { usersController} from './users.controller';
import { PrismaService } from 'src/database/prisma.service';
import { usersService } from './users.service';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    // forwardRef indica que a importação circular(dois módulos um importando o outro) será feita pelo auth modules, ele import ao usermodules
    forwardRef(()=>  AuthModule),
    PassportModule.register({ defaultStrategy: 'local' }),
  ],
  controllers: [usersController],
  providers: [PrismaService, usersService],
  exports :[usersService]
})
export class usersModule {}