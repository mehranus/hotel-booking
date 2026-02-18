
import { BookingType } from "src/common/enums/booking.enum";
import { RoomsEntity } from "src/modules/rooms/entity/rooms.entity";
import { UserEntity } from "src/modules/users/entity/user.entity";
import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Index(['room','checkIn','checkOut'])
@Entity('BookingEntity')
export class BookingEntity{
  @PrimaryGeneratedColumn('increment')
  id:number;

  @ManyToOne(()=>UserEntity)
  user:UserEntity

  @ManyToOne(()=>RoomsEntity,room=>room.bookings)
  room:RoomsEntity

  @Column({type:'date'})
  checkIn:string

  @Column({type:'date'})
  checkOut:string

  @Column({
    type:'enum',
    enum:BookingType,
    default:BookingType.CONFIRMED
  })
  status:BookingType

  @CreateDateColumn()
  createdAt: Date;

}