import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import {Renda} from "./Renda"


@Entity("tb_user")
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    user_name: string

    @Column()
    user_email: string
    
    @Column()
    user_pass: string

    @OneToMany(() => Renda, (renda) => renda.user)
    rendas: Renda[]
}