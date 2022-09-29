import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { User } from "./User"
import { Parcel } from "./Parcel"

@Entity()
export class Income {
    @PrimaryGeneratedColumn()
    incCode: number

    @Column({ type: "real" })
    incMoney: number

    @Column()
    incCategory: string

    @Column()
    incPaymentMethod: number

    @Column()
    incTotalPayment: boolean

    @Column()
    incTimes: string

    @Column()
    incPending: boolean

    @Column({ type: "date" })
    incDate: string
    
    @Column()
    incDescription: string
  
    @ManyToOne(() => User, (user) => user.userCode)
    userCode: User

    @ManyToOne(() => Parcel, (parcel) => parcel.parcelCode)
    parcelCode: Parcel
}