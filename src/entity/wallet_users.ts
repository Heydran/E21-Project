import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import { User } from "./User"
import { Wallet } from "./Wallet"

@Entity()
export class WalletUsers {
    @PrimaryGeneratedColumn()
    wuCode: number

    @ManyToOne(() => User, (user) => user.userCode)
    userCode: number

    @ManyToOne(() => Wallet, (wallet) => wallet.walletCode)
    walletCode: number
}
