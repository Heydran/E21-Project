import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { User } from "./User"

@Entity()
export class Wallet {
    @PrimaryGeneratedColumn()
    walletCode: number

    @Column()
    walletName: string

    @Column()
    walletPasswd: string

    @Column()
    walletDesc: string

    @ManyToOne(() => User, (user) => user.userCode)
    owner: User

}
