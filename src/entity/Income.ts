import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { User } from "./User"

@Entity()
export class Income {
    @PrimaryGeneratedColumn()
    incCode: number

    @Column()
    incMoney: string

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
    incDate: Date
    
    @Column()
    incDescription: string
  
    @ManyToOne(() => User, (user) => user.userCode)
    userCode: User
}