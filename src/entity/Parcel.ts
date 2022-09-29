import { Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm"
import { User } from "./User"

@Entity()
export class Parcel {
    @PrimaryGeneratedColumn()
    parcelCode: number

    @Column()
    parcelDescription: string
    
    @ManyToOne(() => User, (user) => user.userCode)
    userCode: User


}