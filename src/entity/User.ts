import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    userCode: number

    @Column()
    userName: string

    @Column()
    userMoney: number

    @Column()
    userPhone: string

    @Column()
    userEmail: string
    
    @Column()
    userPasswd: string

}