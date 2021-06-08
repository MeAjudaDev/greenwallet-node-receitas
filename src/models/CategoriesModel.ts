/* eslint-disable camelcase */
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'

@Entity('categories')
export default class Categories {
    @PrimaryGeneratedColumn('increment')
    public id: string

    @Column()
    user_id: string

    @Column()
    name: string

    @Column()
    state: string

    @Column()
    type: string
}
