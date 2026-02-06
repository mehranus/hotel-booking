import { RoomsEntity } from "src/modules/rooms/entity/rooms.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('HotelEntity')
export class HotelEntity{
  @PrimaryGeneratedColumn('increment')
  id:number;

  @Column()
  name:string;

  @Column()
  addrass:string;

  @Column({nullable:true})
  description:string;

  @OneToMany(()=>RoomsEntity,room=>room.hotel)
  rooms:RoomsEntity[]
}