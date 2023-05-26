import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { CreateUserBody } from "src/dtos/create-user-body";
import { usersService } from "src/users/users.service";

@Injectable()
export class AuthService {
  constructor (private usersService : usersService) {}

  async validateUser (userName : string, userPassword: string){
    const foundUser : any = await this.usersService.findByUser(userName)
    const password = foundUser.password
    console.log(foundUser)

    if(foundUser && password === userPassword){
      const {id, displayName, user} = foundUser
      return {id, displayName, user}
    }

    return null
  }

}