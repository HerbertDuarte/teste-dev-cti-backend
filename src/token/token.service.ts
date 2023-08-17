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
        where: { id: existingToken.id },
        data: {
          ...existingToken,
          hash
        }
      })

      return res

    } else {
      // console.log('token inexistente')

      const res = await this.prisma.token.create({
        data: {
          hash,
          username
        }
      })

    }
  }

  async refreshToken(oldToken: string) {

    console.log('Passou pelo service')

    const tokenFound = await this.prisma.token.findFirst({
      where: {
        hash: oldToken
      }
    })

    console.log('Token encontrado : ', tokenFound)

    if(tokenFound){
      const {username} = tokenFound
      
      const user = await this.userService.findByUser(username)
      if(user){
        console.log('Achou um user : ', user)
        const res = await this.authService.login(user)

        return res
      }else{
        console.log('não achou user')
      }
    }


    if(!tokenFound){
      console.log('token não encontrado')
      return new HttpException({
        errorMessage: 'Token inválido'
      }, HttpStatus.UNAUTHORIZED)
    }

  }
}