import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { User } from "./User"

@Entity()
export class Income {
    @PrimaryGeneratedColumn()
    incCode: number

    @Column()
    incValue: string

    @Column()
    incDate: string

    
    @Column()
    incType: string

    @Column()
    incDesc: string

    @Column()
    incEndDate: string

    @Column()
    incStatus: string

    @ManyToOne(() => User, (user) => user.userCode)
    user: User
}