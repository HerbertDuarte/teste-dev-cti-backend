import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateModuleBody } from 'src/dtos/create-module-body';
import { v4 as uuidv4 } from 'uuid';

@Controller('modulo')
export class ModuloController {
  constructor(private prisma : PrismaService){}

  @Get('list')
  async ListModules(){
    const modulos = await this.prisma.module.findMany()

    return modulos
  }

  @Get('list/:id')
  async listSingleModule(@Param('id') id : string){

    try {
      const module = await this.prisma.module.findUnique({where : {id}})
      return module
    } catch (error) {
      return error.message
    }

  }

  @Post('create')
  async createModulo(@Body() body : CreateModuleBody){
    const {name} = body
    console.log(body)
    
    try {
      await this.prisma.module.create({
        data: {
          id : uuidv4(),
          name
      }})
      return 'success created module'
    }
    
    catch (error) {console.log('erro: ' + error.message)}
  }
  
  @Delete('delete/:id')
  async deleteModulo(@Param('id') id: string )  {
    
    try {
      await this.prisma.module.delete({
        where :{id},
      })

      return 'Deleted module'
    } catch (error) {
      return error.message
    }
  }

  @Put('register/student/:id')
  async registerStudent(@Param('id') id : string){

    

  }

}
