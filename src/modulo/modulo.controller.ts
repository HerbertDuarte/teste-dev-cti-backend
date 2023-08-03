import { Controller, Get } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Controller('modulo')
export class ModuloController {
  constructor(private prisma : PrismaService){}

  @Get('list')

  async ListModules(){
    return('route found')
  }
}
