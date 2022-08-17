import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import {User} from "./user"

@Entity("tb_renda")
export class Renda {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    val_renda: number

    @Column()
    data_renda: string

    @Column()
    tipo_renda: number

    @Column()
    desc_renda: string

    @Column()
    data_final_renda: string

    @Column()
    situacao_renda: boolean

    @Column()
    cod_usuario: number

    @ManyToOne(() => User, (user) => user.rendas)
    user: User
}