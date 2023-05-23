import { Module } from '@nestjs/common';
import { StudentsController } from './app.controller';
import { PrismaService } from './database/prisma.service';

@Module({
  imports: [],
  controllers: [StudentsController],
  providers: [PrismaService],
})
export class AppModule {}
