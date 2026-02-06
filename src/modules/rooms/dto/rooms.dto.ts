import { IsEnum, IsNumber, IsString, Min } from "class-validator";
import { RoomType } from "src/common/enums/roomType.enum";

export class CreateRoomDto{
  @IsString()
  roomNumber:string;

  @IsNumber()
  @Min(1)
  capacity:number

  @IsEnum(RoomType)
  type:RoomType

  @IsNumber()
  @Min(0)
  pricePerNight:number
}