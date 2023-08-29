import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guards';
import { PrismaService } from 'src/database/prisma.service';
import { CreateModuleBody, StudentModuleBody } from 'src/dtos/create-module-body';
import { v4 as uuidv4 } from 'uuid';

@Controller('modules')
export class ModuloController {
  constructor(private prisma : PrismaService){}

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Get('list/:id')
  async listSingleModule(@Param('id') id : string){

    try {
      const data = await this.prisma.module.findUnique({
        where : {id},
        include : {
          StudentModule : {
            select :{
              student : true,
              id : true,
              score: true,
              module : true
            }
          },
        }
      })
      if(data.StudentModule.length > 0){

        const modulo = data.StudentModule.map(element =>{
          if(!Array.isArray(element.score) || element.score.length === 0 || !element.score){
          return {
            ...element,
            media : undefined
          }
        }
        const score = element.score
        const sum = score.reduce(((accumulator,score) => accumulator + score), 0)
        const media = sum / score.length
        
        return {
          ...element,
          media
        }
      })
      
      
      return modulo
    }else{
      return data
    }
    } catch (error) {
      return error.message
    }

  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createModulo(@Body() body : CreateModuleBody){
    const {name} = body
    // console.log(body)
    
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
  
  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  async deleteModulo(@Param('id') id: string )  {

    await this.prisma.studentModule.deleteMany({
      where : {
        id_module : id
      }
    })
    
    try {
      await this.prisma.module.delete({
        where :{id},
      })
    } catch (error) {
      return error.message
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put('update/:id')
  async updateModule(@Param('id') id: string, @Body() body)  {
    const {name} = body
    
    try {
      await this.prisma.module.update({
        where: {id},
        data:{
          name
        }
      })
      return 'Módulo atualizado com sucesso'
    } catch (error) {
      throw new Error('Erro ao atualizar o módulo')
    }
  }

  // GESTÃO DE ESTUDANTES EM CADA MÓDULO

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Post('register/student/')
  async registerStudent(@Body() body : StudentModuleBody){

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

  @UseGuards(JwtAuthGuard)
  @Post('delete/student/')
  async deleteModuleStudent(@Body() body: StudentModuleBody){
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
  
  @UseGuards(JwtAuthGuard)
  @Get('score/:id')
  async showScore(@Param('id') id : string){

    const data = await this.prisma.studentModule.findFirst({
      where : {id},
      select : {
        score: true,
        student : true,
        module : true        
      }
    })
    // console.log(data)

    if(!Array.isArray(data.score) || data.score.length === 0 || !data.score){
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

  @UseGuards(JwtAuthGuard)
  @Put('update/score/:id')
  async updateScore(@Param('id') id : string, @Body() body : StudentModuleBody){

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
