import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { User } from "./User"

@Entity()
export class Income {
    @PrimaryGeneratedColumn()
    incCode: number

    @Column({ type: "float" })
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

    @Column({ type: "date" })
    incDate: string
    
    @Column()
    incDescription: string
  
    @ManyToOne(() => User, (user) => user.userCode)
    userCode: User
}