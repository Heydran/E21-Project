import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Func } from "./Func"

@Entity()
export class Photo {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    url: string

    @ManyToOne(() => Func, (user) => user.photos)
    user: Func
}