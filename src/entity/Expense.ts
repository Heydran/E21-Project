import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { User } from "./User"

@Entity()
export class Expense {
    @PrimaryGeneratedColumn()
    expCode: number

    @Column()
    expMoney: number

    @Column()
    expCategory: string

    @Column()
    expPayments: string

    @Column()
    expTotalValue: boolean

    @Column()
    expTimes: string

    @Column()
    expPending: boolean

    @Column({ type: "date" })
    expDate: string
    
    @Column()
    expDescription: string
  
    @ManyToOne(() => User, (user) => user.userCode)
    userCode: User
}