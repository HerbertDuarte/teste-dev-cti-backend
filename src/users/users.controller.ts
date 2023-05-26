import { Controller, Post, Get, Body } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserBody } from 'src/dtos/create-user-body';
import { v4 as uuidv4 } from 'uuid';

@Controller('')
export class usersController {
  constructor(private prisma: PrismaService) {}

  @Post('user/create')
  async findUser(@Body() body : CreateUserBody){

    console.log(body)
    const {displayName, user, password} = body

    await this.prisma.usersModel.create({
      data :{
        id : uuidv4(),
        displayName,
        user,
        password
      }
    })
    return 'success post'
  }

  @Get("users/list")
  async listUsers(){
    const users = await this.prisma.usersModel.findMany()

    return users
  }
}