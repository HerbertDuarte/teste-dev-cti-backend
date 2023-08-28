import { Module, forwardRef } from '@nestjs/common';
import { StudentsController } from './student/student.controller';
import { PrismaService } from './database/prisma.service';
import { ModuloController } from './modulo/modulo.controller';
import { ModuloService } from './modulo/modulo.service';
import { ModuloModule } from './modulo/modulo.module';
import { StudentModule } from './student/student.module';
import { AuthModule } from './auth/auth.module';
import { PingService } from './ping/ping.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ModuloModule, StudentModule, AuthModule, ScheduleModule.forRoot()],
  controllers: [StudentsController, ModuloController],
  providers: [PrismaService, ModuloService, PingService, PingService],
})
export class AppModule {}
