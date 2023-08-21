import { Controller, Get, Post, Body, Put, Param, Delete, Query,  HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { CreateStudentBody } from 'src/dtos/create-student-body';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guards';


@Controller('students')
export class StudentsController {
  constructor(private prisma: PrismaService) {}

@UseGuards(JwtAuthGuard)
 @Get('list')
 async listStudents(){
  const students = await this.prisma.student.findMany({
    include : {
      StudentModule : {
        select : {
          module : true,
          score: true
        }
      }
    }
  })

  return students
 }
//  @UseGuards(JwtAuthGuard)
 @Get('list/:id')
 async listSingleStudent(@Param('id') id: string){

  const student = await this.prisma.student.findUnique({
    where : {id},
    include : {
      StudentModule : {
        select :{
          module: true,
          id : true,
          score : true
        }
      }
    }
  })

  return student
 }
//  @UseGuards(JwtAuthGuard)
 @Get('find')
  async searchUsers(@Query('name') name: string) {
    const users = await this.prisma.student.findMany({
      where: {
        name: {
          contains: name,
          mode : 'insensitive'
        },
      },
      include : {
        StudentModule : true
      }
    });

  return users;
  }
  // @UseGuards(JwtAuthGuard)
 @Post('create')
  async createStudent(@Body() body : CreateStudentBody){
    
    console.log(body)
    const { name, cpf, date} = body

    try {
      await this.prisma.student.create({

        data:{
          id : uuidv4(),
          name,
          cpf,
          date,
        }
    })
  } catch (error) {
    if (error.code === 'P2002' && error.meta?.target?.includes('cpf')) {
      throw new HttpException('Esse CPF já foi registrado.', HttpStatus.BAD_REQUEST);
    }
    throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
  }
    
  }
  // @UseGuards(JwtAuthGuard)
  @Put('update/:id')
  async updateStudentData(@Param('id') id: string, @Body() body: CreateStudentBody) {
    
    try {
      const update = await this.prisma.student.update({
        where: {id},
        data: body,
      });
      return update;
    } catch (error) {

      console.error('Erro ao atualizar:', error);

    }
  }
  // @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  async deleteStudentData(@Param('id') id: string) {

    await this.prisma.studentModule.deleteMany({
      where : {
        id_student : id
      }
    })
    
    try {
      const deleteStudent = await this.prisma.student.delete({
        where: {id},
      });
      return deleteStudent;
    } catch (error) {

      console.error('Erro ao excluir:', error);

    }
  }
}
