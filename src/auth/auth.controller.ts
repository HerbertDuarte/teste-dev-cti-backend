import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

import { UnauthorizedException } from '@nestjs/common/exceptions';
import { UserBody } from 'src/dtos/user-body';

@Controller()
export class AuthController {
  constructor(private prisma: PrismaService) {}

  @Post('auth/login')
  async userLogin(@Body() body: UserBody) {

    const {user : userName, password} = body
    const foundUser = this.prisma.usersModel.findFirst({
      where : {user : userName },
      select : { id: true, user: true, password: true, displayName : true  }
    })
    
    if(foundUser && password !== (await foundUser).password){
      throw new UnauthorizedException()
    }

    const {id, displayName, user } = (await foundUser)
    return {id, displayName, user}
  } 
  
}