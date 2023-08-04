import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentsController } from './student.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  providers: [StudentService, PrismaService],
  controllers: [StudentsController]
})
export class StudentModule {}
