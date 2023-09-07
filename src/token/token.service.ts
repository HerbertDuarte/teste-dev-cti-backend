import { HttpException, HttpStatus, Inject, Injectable, forwardRef } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/database/prisma.service';
import { usersService } from 'src/users/users.service';

@Injectable()
export class tokenService {

  constructor(
    private prisma: PrismaService,
    private userService : usersService,
    @Inject(forwardRef(()=> AuthService))
    private authService : AuthService
  ) { }

  async save(hash: string, username: string) {

    const existingToken = await this.prisma.token.findFirst({
      where: { username }
    })

    if (existingToken) {
      const res = await this.prisma.token.update({
        where: { username },
        data: {
          ...existingToken,
          hash
        }
      })

      return res

    } else {
      const res = await this.prisma.token.create({
        data: {
          hash,
          username
        }
      })
      return res
    }
  }

  async refreshToken(oldToken: string) {

    console.log(oldToken)
    const tokenFound = await this.prisma.token.findUnique({
      where: {
        hash : oldToken
      }
    })

    console.log('tokenFound')
    console.log(tokenFound)

    if(tokenFound){
      const {username} = tokenFound
      
      const user = await this.userService.findByUser(username)
      console.log(user)
      if(user){
        const res = await this.authService.login(user)

        return res
    }}


    if(!tokenFound){
      return new HttpException({
        errorMessage: 'Token inválido'
      }, HttpStatus.UNAUTHORIZED)
    }

  }

  async verifyTokenByUser(uname : string, hash : string){

    try {
      const res = await this.prisma.token.findUnique({
        where: {hash}
      })
      if(res.username == uname){
        return true
      }
      
    } catch (error) {
      console.log(error)
      throw new HttpException({
        errorMessage: 'Houve um erro de segurança ao fazer essa requisiçao.'
      }, HttpStatus.UNAUTHORIZED)
    }
  }
}