import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserBody } from 'src/dtos/create-user-body';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt'

@Injectable()
export class usersService {;
constructor(private prisma : PrismaService){}

  async findByUser(userName : string) {

    const foundUser = await this.prisma.user.findFirst({
      where: {user : userName},
      select : { id: true, displayName : true, user: true, role: true }
      })
  
   if(!foundUser){
    return undefined
   }

   return foundUser

  }

  async createUser( body : CreateUserBody){

    const {displayName, user, password} = body
    const {rolecode} = body

    let role = 'user'

    if(rolecode == process.env.ROLE_CODE){
      role = 'admin'
    }
 
    await this.prisma.user.create({
      data :{
        id : uuidv4(),
        displayName,
        user,
        role,
        password : await bcrypt.hashSync(password, 10)
      }
    })
    return 'user created successfully!'
  }

  async deleteUser(username:string) {
  
    const response = await this.prisma.user.delete({
      where: {user : username}
    })

    return response
  }
}