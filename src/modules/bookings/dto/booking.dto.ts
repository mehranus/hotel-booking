import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber} from "class-validator";

export class CreateBookingDto{
  @ApiProperty()
  @IsNumber()
  roomId:number;

  @ApiProperty()
  @IsDateString()
  checkOut:string

  @ApiProperty()
  @IsDateString()
  checkIn:string
}