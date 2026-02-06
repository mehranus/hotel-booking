import { Role } from "src/common/enums/role.enum";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('UserEntity')
export class UserEntity{
  @PrimaryGeneratedColumn('increment')
  id?:number;

  @Column({unique:true})
  email:string;

  @Column()
  password:string;

  @Column({type: 'enum' , enum:Role,default:Role.GUEST})
  role?:Role;

  @CreateDateColumn()
  createdAt?:Date;
  
}