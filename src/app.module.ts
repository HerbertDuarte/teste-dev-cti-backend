import { Module } from '@nestjs/common';
import { StudentsController } from './student/student.controller';
import { PrismaService } from './database/prisma.service';
import { usersModule } from './users/users.module';
import { authModule } from './auth/auth.module';
import { ModuloController } from './modulo/modulo.controller';
import { ModuloService } from './modulo/modulo.service';
import { ModuloModule } from './modulo/modulo.module';
import { StudentModule } from './student/student.module';

@Module({
  imports: [usersModule, authModule, ModuloModule, StudentModule],
  controllers: [StudentsController, ModuloController],
  providers: [PrismaService, ModuloService],
})
export class AppModule {}
