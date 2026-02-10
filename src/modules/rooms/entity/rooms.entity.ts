import { RoomType } from "src/common/enums/roomType.enum";
import { BookingEntity } from "src/modules/bookings/entity/booking.entity";
import { HotelEntity } from "src/modules/hotels/entity/hotel.entity";
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('RoomsEntity')
export class RoomsEntity{
  @PrimaryGeneratedColumn('increment')
  id:number;

  @Column()
  roomNumber:string;

  @Column()
  capacity:number;

  @Column({type:'enum',enum:RoomType})
  type:RoomType

  @Column()
  pricePerNight:number;

  @ManyToOne(()=>HotelEntity,hotel=>hotel.rooms,{onDelete:'CASCADE'})
  hotel:HotelEntity
  
  @ManyToOne(()=>BookingEntity,booking=>booking.room)
  bookings:BookingEntity[]
}