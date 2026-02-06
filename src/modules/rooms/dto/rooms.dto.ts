import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsString, Min } from "class-validator";
import { RoomType } from "src/common/enums/roomType.enum";

export class CreateRoomDto{
  @ApiProperty()
  @IsString()
  roomNumber:string;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  capacity:number

  @ApiProperty()
  @IsEnum(RoomType)
  type:RoomType

  @ApiProperty()
  @IsNumber()
  @Min(0)
  pricePerNight:number
}