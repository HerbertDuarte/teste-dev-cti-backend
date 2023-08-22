import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { tokenService } from 'src/token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma : PrismaService, 
    private jwtService : JwtService, 
    private tokenService : tokenService){}

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
      const {user, id} = data
      const payload = {user, sub : id}
      
      const token = this.jwtService.sign(payload)
      await this.tokenService.save(token, user)

      return {
        access_token : token
      }
    } catch (error) {
      console.log('erro no auth service')
      return(error)
    }
      

  }
}
