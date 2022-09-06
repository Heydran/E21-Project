import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { User } from "./User"

@Entity()
export class Expenses {
    @PrimaryGeneratedColumn()
    expCode: number

    @Column()
    expValue: string

    
    @ManyToOne(() => User, (user) => user.userCode)
    user: User
}