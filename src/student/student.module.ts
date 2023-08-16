import { Module} from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentsController } from './student.controller';
import { PrismaService } from 'src/database/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports:[],
  providers: [StudentService, PrismaService, JwtService],
  controllers: [StudentsController]
})
export class StudentModule {}
