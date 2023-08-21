import { Controller, Post, Get, Body, Request, UseGuards } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserBody } from 'src/dtos/create-user-body';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt'
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guards';

@Controller('')
export class usersController {
  constructor(private prisma: PrismaService, private auth : AuthService) {}

  // @Post('user/create')
  // async findUser(@Body() body : CreateUserBody){

  //   // console.log(body)
  //   const {displayName, user, password} = body

  //   await this.prisma.user.create({
  //     data :{
  //       id : uuidv4(),
  //       displayName,
  //       user,
  //       password : await bcrypt.hashSync(password, 10)
  //     }
  //   })
  //   return 'user created successfully!'
  // }
  
  // @UseGuards(JwtAuthGuard)
  @Get("users/list")
  async listUsers(){
    const users = await this.prisma.user.findMany()

    return users
  }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req){
    return this.auth.login(req.user)
  }
}