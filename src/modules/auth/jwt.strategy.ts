import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt"
import { jwtConfig } from "src/config/jwt.config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt'){
  constructor(){
    super({
      jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfig.secret
    })
  }
  validate(payload:any) {
  return{
    userId:payload.sub,
    role:payload.role
  }
  }
}