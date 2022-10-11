import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { User } from "./User"
import { Parcel } from "./Parcel"
import { Wallet } from "./Wallet"

@Entity()
export class Expense {
    @PrimaryGeneratedColumn()
    expCode: number

    @Column({ type: "real" })
    expMoney: number

    @Column()
    expCategory: string

    @Column()
    expPaymentMethod: number

    @Column()
    expTotalPayment: boolean

    @Column()
    expTimes: string

    @Column()
    expPending: boolean

    @Column({ type: "date" })
    expDate: string

    @Column()
    expDescription: string

    @ManyToOne(() => User, (user) => user.userCode)
    user: User

    @ManyToOne(() => Parcel, (parcel) => parcel.parcelCode)
    parcel: Parcel

    @ManyToOne(() => Wallet, (wallet) => wallet.walletCode)
    wallet: Wallet
}