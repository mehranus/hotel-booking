import { IsString } from "class-validator";

export class CreateHotelDto{
  @IsString()
  name:string;

  @IsString()
  address:string

  @IsString()
  description:string
}