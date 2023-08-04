import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class usersService {;
constructor(private prisma : PrismaService){}

  async findByUser(userName) {

    const foundUser = await this.prisma.user.findFirst({
      where: {user : userName},
      select : { id: true, displayName : true, user: true, password: true  }
      })
  
   if(!foundUser){
    return {error : 'User not found!'}
   }

   return foundUser

  }
}