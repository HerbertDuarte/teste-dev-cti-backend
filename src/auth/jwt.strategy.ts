import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt } from "passport-jwt";
import { Strategy } from "passport-local";
import { jwtConstants } from "./constants";

// CÓDIGO COPIADO DA DOCUMENTAÇÃO DO NEST/SECURITY/AUTHENTICATION
@Injectable()

export class JwtStrategy extends PassportStrategy(Strategy){
  constructor(){
    super({
      jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration : false,
      secretOrKey : jwtConstants.secret
    })
  }

  async validate(payload){
    return {id : payload.sub, username : payload.username}
  }
}