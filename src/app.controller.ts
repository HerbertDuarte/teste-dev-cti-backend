import { Controller, Get, Post, Body, Put, Param, Delete} from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import {CreateStudentBody} from './dtos/create-student-body'

@Controller('students')
export class StudentsController {
  constructor(private prisma: PrismaService) {}

 @Get('list')
 async listStudents(){

  const students = await this.prisma.studentsModel.findMany()

  return students
 }

 @Get('list/:id')
 async listSingleStudent(@Param('id') id: any){

  const student = await this.prisma.studentsModel.findUnique({
    where : {id}
  })

  return student
 }

 @Post('create')
  async createStudent(@Body() body : CreateStudentBody){
    
    console.log(body)
    const { name, cpf, date} = body

    await this.prisma.studentsModel.create({

      data : {
        id : uuidv4(),
        name,
        cpf,
        date,
        score : {}
      }
  })
  }

  @Put('update/:id')
  async updateStudentData(@Param('id') id: any, @Body() body: any) {
    
    try {
      const update = await this.prisma.studentsModel.update({
        where: {id},
        data: body,
      });
      return update;
    } catch (error) {

      console.error('Erro ao atualizar:', error);

    }
  }

  @Delete('delete/:id')
  async deleteStudentData(@Param('id') id: any) {
    
    try {
      const deleteStudent = await this.prisma.studentsModel.delete({
        where: {id},
      });
      return deleteStudent;
    } catch (error) {

      console.error('Erro ao excluir:', error);

    }
  }
}
