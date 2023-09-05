import { Controller, Post, Get, Body, Request, UseGuards, Param } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserBody } from 'src/dtos/create-user-body';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt'
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { usersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guards';
import { tokenService } from 'src/token/token.service';
import { StudentService } from 'src/student/student.service';
import { error } from 'console';

@Controller('')
export class usersController {
  constructor(private prisma: PrismaService, private auth : AuthService, private userService : usersService, private tokenService : tokenService, private studentService : StudentService) {}

  @Post('user/create')
  async createUser(@Body() body : CreateUserBody){
    this.userService.createUser(body)
  }
  
  @Get("users/list")
  async listUsers(){
    const users = await this.prisma.user.findMany()
    return users
  }

  @Post('user/data')
  // @UseGuards(JwtAuthGuard)
  async getUserData(@Body() body){

    const {username, hash} = body
    const isValid = await this.tokenService.verifyTokenByUser(username, hash)

    if(isValid){
      const res = await this.studentService.findStudentByUsername(username)
      return res
    }
  }
  
  @Get("user/find/:username")
  @UseGuards(JwtAuthGuard)
  async FindUser(@Param("username") username : string){
    const user = this.userService.findByUser(username)
    return user
  }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req){
    return this.auth.login(req.user)
  }
}