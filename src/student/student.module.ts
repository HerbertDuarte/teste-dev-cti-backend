import { Module} from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentsController } from './student.controller';
import { PrismaService } from 'src/database/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { usersService } from 'src/users/users.service';

@Module({
  imports:[],
  providers: [StudentService, PrismaService, JwtService, usersService],
  controllers: [StudentsController]
})
export class StudentModule {}
