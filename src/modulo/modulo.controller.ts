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
        StudentModule : {
          select :{
            student : true,
            id : true
          }
        }
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
          StudentModule : {
            select :{
              student : true,
              id : true
            }
          }
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

  // GESTÃO DE ESTUDANTES EM CADA MÓDULO

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

  @Get('student/list/:id')
  async findSingleConnections(@Param('id') id :string){
    try
    {const connection = await this.prisma.studentModule.findUnique({
      where : {id},
      include :{
        student: true,
        module : true
      }})
      return connection
     
    }catch(error){
      return (error.message)
    }
  }

  @Post('delete/student/')
  async deleteModuleStudent(@Body() body: any){
    const {id_module, id_student} = body

    try {
      await this.prisma.studentModule.deleteMany({
        where: {
          id_module,
          id_student
        }
      })
      return 'Aluno removido'
    } catch (error) {
      return error
    }
  }
  
  @Get('score/:id')
  async showScore(@Param('id') id : string){

    const data = await this.prisma.studentModule.findUnique({
      where : {id},
      select : {
        score : true,
        student : true,
        module : true        
      }
    })


    if(!Array.isArray(data.score) || data.score.length === 0){
      return {
        ...data,
        media : undefined
      }
    }
    const score = data.score
    const sum = score.reduce(((accumulator,score) => accumulator + score), 0)
    const media = sum / score.length

    return {
      ...data,
        media
    }
  }

  @Put('update/score/:id')
  async updateScore(@Param('id') id : string, @Body() body : any){

    const {id_module, id_student, score} = body
    try{
      await this.prisma.studentModule.update({
      where: {id},
      data : {id_module, id_student, score}
    })

    return 'Pontuação atualizada com sucesso!'

    }catch(error){
      console.log(error)
      return 'ERRO : ' + error.message
    }
  }
}
