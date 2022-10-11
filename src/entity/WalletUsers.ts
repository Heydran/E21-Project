import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm"
import { User } from "./User"
import { Wallet } from "./Wallet"

@Entity()
export class WalletUsers {
    @PrimaryGeneratedColumn()
    wuCode: number

    @Column()
    favorite: boolean

    @ManyToOne(() => User, (user) => user.userCode)
    user: User

    @ManyToOne(() => Wallet, (wallet) => wallet.walletCode)
    wallet: Wallet
}
