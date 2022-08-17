import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { tUser } from "./User"

@Entity()
export class Income {
    @PrimaryGeneratedColumn()
    inc_code: number

    @Column()
    inc_value: string

    @ManyToOne(() => tUser, (user) => user.user_code)
    user: tUser
}