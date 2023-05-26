import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-local'
import { AuthService } from "./auth.service";


@Injectable()
export class localStrategy extends PassportStrategy(Strategy){
  constructor(private authService : AuthService){
    super({
      userNameField: 'user',
      userPasswordField: 'password',
    })
  }
  async validate(user: string, password : string) :Promise<any> {
    const foundUser = await this.authService.validateUser(user, password)
    console.log(foundUser)
    if(!foundUser){
      throw new UnauthorizedException()
    }
    return foundUser
  }
}