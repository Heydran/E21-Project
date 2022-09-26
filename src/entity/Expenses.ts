import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { User } from "./User"

@Entity()
export class Expenses {
    @PrimaryGeneratedColumn()
    incCode: number

    @Column()
    incMoney: number

    @Column()
    incCategory: string

    @Column()
    incPayments: string

    @Column()
    incTotalValue: boolean

    @Column()
    incTimes: string

    @Column()
    incPending: boolean

    @Column()
    incDate: string
    
    @Column()
    incDescription: string
  
    @ManyToOne(() => User, (user) => user.userCode)
    userCode: User
}