import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm"
import { User } from "./User"
import { Wallet } from "./Wallet"

@Entity()
export class ShareRequest {
    @PrimaryGeneratedColumn()
    SRCode: number

    @Column()
    shareCode: number

    @ManyToOne(() => Wallet, (wallet) => wallet.walletCode)
    walletCode: Wallet
}
