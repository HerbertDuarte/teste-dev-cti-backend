import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/prisma.service';
import { ModuloController } from './modulo.controller';
import { ModuloService } from './modulo.service';

@Module({
  imports:[],
  providers: [ModuloService, PrismaService, JwtService],
  controllers: [ModuloController]
})
export class ModuloModule {}
