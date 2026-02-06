import { IsOptional, IsString, MinLength } from "class-validator";

export class CreateHotelDto{
  @IsString()
  @MinLength(3)
  name:string;

  @IsString()
  address:string

  @IsString()
  @IsOptional()
  description?:string
}