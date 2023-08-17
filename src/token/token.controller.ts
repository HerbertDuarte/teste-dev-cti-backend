import { Body, Controller, Post, Put, UseGuards } from "@nestjs/common";
// import { PrismaService } from "src/database/prisma.service";
import { tokenService } from "./token.service";
// import { JwtAuthGuard } from "src/auth/jwt.auth.guards";

@Controller()
export class TokenController{
  constructor(
    private tokenService : tokenService
  ){}


  @Post('refresh/token')
  async refreshToken(@Body() body){

    const {oldToken} = body

    try {
      const res = await this.tokenService.refreshToken(oldToken)
      return res
    } 
    catch (error) {
      return error
    }

  }
}