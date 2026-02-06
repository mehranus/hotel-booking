import { IsNumber, IsString } from "class-validator";

export class CreateRoomDto{
  @IsString()
  roomNumber:string;

  @IsNumber()
  capacity:number

  @IsNumber()
  pricePerNight:number
}