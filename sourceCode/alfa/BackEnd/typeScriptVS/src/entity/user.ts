import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"

@Entity()
export class tUser {
    @PrimaryGeneratedColumn()
    user_code: number

    @Column()
    user_name: string

    @Column()
    user_email: string

    @Column()
    user_passwd: string

}