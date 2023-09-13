import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { usersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma : PrismaService, 
    private jwtService : JwtService,
    private user : usersService){}

  async validateUser(username:string, password : string) {
    const userFound = await this.prisma.user.findFirst({
      where : {user : username}
    })

    if(userFound && await bcrypt.compareSync(password, userFound.password)){
      return {
        ...userFound,
        password : undefined
      }
    }

    return null
  }

  async login(data :any){

    try {
      const {user, id, role} = data
      const payload = {user, sub : id , role}
      const token = this.jwtService.sign(payload)
      const userInfo = await this.user.findByUser(user)

      return {
        user : userInfo,
        access_token : token
      }
      }

     catch (error) {
      return(error)
    }
      

  }
}
