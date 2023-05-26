import { Module } from '@nestjs/common';
import { StudentsController} from './app.controller';
import { PrismaService } from './database/prisma.service';
import { usersModule } from './users/users.module';
import { authModule } from './auth/auth.module';

@Module({
  imports: [usersModule, authModule],
  controllers: [StudentsController],
  providers: [PrismaService],
})
export class AppModule {}
