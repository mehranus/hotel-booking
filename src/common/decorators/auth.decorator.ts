import { applyDecorators, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { RoleGuard } from "../guards/roles.guard";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";


export function AuthDecorator(tag:string){
  return applyDecorators(
    ApiTags(tag),
    ApiBearerAuth('Authuriztion'),
    UseGuards(JwtAuthGuard,RoleGuard)
  )
}