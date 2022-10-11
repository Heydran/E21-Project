import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { User } from "./User"
import { Parcel } from "./Parcel"
import { Wallet } from "./Wallet"

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
    user: User

    @ManyToOne(() => Parcel, (parcel) => parcel.parcelCode)
    parcel: Parcel

    @ManyToOne(() => Wallet, (wallet) => wallet.walletCode)
    wallet: Wallet
}