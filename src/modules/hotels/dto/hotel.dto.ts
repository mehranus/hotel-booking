import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, MinLength } from "class-validator";

export class CreateHotelDto{
  @ApiProperty()
  @IsString()
  @MinLength(3)
  name:string;

  @ApiProperty()
  @IsString()
  addrass:string

  @ApiProperty({required:false})
  @IsString()
  @IsOptional()
  description?:string
}