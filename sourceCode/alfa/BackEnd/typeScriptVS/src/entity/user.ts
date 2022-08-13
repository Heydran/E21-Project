import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class tUser {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    user_name: string

    @Column()
    user_email: string
    
    @Column()
    user_pass: string
}