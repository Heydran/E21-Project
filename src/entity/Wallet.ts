import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm"
import { User } from "./User"

@Entity()
export class Wallet {
    @PrimaryGeneratedColumn()
    walletCode: number

    @Column()
    walletName: string

    @Column()
    userDesc: string

    @ManyToMany(() => User)
    @JoinTable()
    walletUsers: User[]
}
