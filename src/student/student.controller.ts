import { Controller, Get, Post, Body, Put, Param, Delete, Query,  HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { CreateStudentBody } from 'src/dtos/create-student-body';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guards';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/users/enum/user-roles-enum';
import { usersService } from 'src/users/users.service';
import { StudentService } from './student.service';

@Controller('students')
export class StudentsController {
  constructor(private prisma: PrismaService, private userService : usersService, private studentService : StudentService) {}

  @Get('list')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
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

 @Get('list/:id')
 @UseGuards(JwtAuthGuard)
 async listSingleStudent(@Param('id') id: string){

  return this.studentService.findStudent(id)
  
 }
 @UseGuards(JwtAuthGuard)
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

 @Post('create')
 @Roles(Role.ADMIN)
 @UseGuards(JwtAuthGuard, RolesGuard)
  async createStudent(@Body() body : CreateStudentBody){
    
    const { name, cpf, date, username} = body

    const userBody = {
      displayName : name,
      user : username,
      password : cpf,
    }

    try {

      
      await this.prisma.student.create({
        
        data:{
          id : uuidv4(),
          name,
          cpf,
          date,
          username,
        }
      })
      await this.userService.createUser(userBody)

    } catch (error) {
    if (error.code === 'P2002' && error.meta?.target?.includes('cpf')) {
      throw new HttpException('Esse CPF já foi registrado.', HttpStatus.BAD_REQUEST);
    }
    else if (error.code === 'P2002' && error.meta?.target?.includes('username')) {
      throw new HttpException('Esse nome de usuário já foi registrado.', HttpStatus.BAD_REQUEST);
    }
    throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
  }
    
  }
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
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
