import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private prisma : PrismaService, private jwtService : JwtService){}

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

  async login(user :any){

      const payload = {username : user.username, sub : user.id}
      return {
        access_token : this.jwtService.sign(payload)
      }
    // }

  }
}
