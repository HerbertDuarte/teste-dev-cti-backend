import { Module } from '@nestjs/common';
import { StudentsController } from './student/student.controller';
import { PrismaService } from './database/prisma.service';
import { ModuloController } from './modulo/modulo.controller';
import { ModuloService } from './modulo/modulo.service';
import { ModuloModule } from './modulo/modulo.module';
import { StudentModule } from './student/student.module';
import { AuthModule } from './auth/auth.module';
import { usersService } from './users/users.service';
import { StudentService } from './student/student.service';

@Module({
  imports: [ModuloModule, StudentModule, AuthModule],
  controllers: [StudentsController, ModuloController],
  providers: [PrismaService, ModuloService, usersService, StudentService],
})
export class AppModule {}
