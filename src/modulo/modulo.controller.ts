import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateModuleBody } from 'src/dtos/create-module-body';
import { v4 as uuidv4 } from 'uuid';

@Controller('modules')
export class ModuloController {
  constructor(private prisma : PrismaService){}

  @Get('list')
  async ListModules(){
    const modulos = await this.prisma.module.findMany({
      include : {
        StudentModule : true
      }
    })

    return modulos
  }

  @Get('list/:id')
  async listSingleModule(@Param('id') id : string){

    try {
      const module = await this.prisma.module.findUnique({
        where : {id},
        include : {
          StudentModule : true
        }
      })
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

  @Post('register/student/')
  async registerStudent(@Body() body : any){

    const {id_module, id_student} = body

    try {
      const moduleStudent = await this.prisma.studentModule.create({
        data: {
          id_module,
          id_student
        },
      });
      return moduleStudent
    } catch (error) {
      console.error('Erro ao adicionar aluno:', error);
      return error

    }
  }

  @Get('students/list')
  async findAllConnections(){
    const allConnections = await this.prisma.studentModule.findMany()

    return allConnections
  }

  //  @Delete('delete')
  //  async deleteAll(){
  //    return await this.prisma.studentModule.deleteMany()
  //  }

}
