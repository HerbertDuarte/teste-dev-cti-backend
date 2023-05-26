import { Controller, Post, Get, Body } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserBody } from 'src/dtos/create-user-body';
import { UserBody } from 'src/dtos/user-body';
import {UnauthorizedException } from "@nestjs/common";

// import { usersService } from './users.service';
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

  // @Post('user/login')
  // async userLogin(@Body() body : UserBody){

  //   const {user : userName, password} = body
  //   const foundUser = this.prisma.usersModel.findFirst({
  //     where : {user : userName },
  //     select : { id: true, user: true, password: true, displayName : true  }
  //   })
    
  //   if(foundUser && password !== (await foundUser).password){
  //     throw new UnauthorizedException()
  //   }

  //   const {id, displayName, user } = (await foundUser)
  //   return {id, displayName, user}
  // } 
}