/* eslint-disable camelcase */
import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('categories')
export default class Categories {
    @PrimaryColumn()
    id: string

    @Column()
    user_id: string

    @Column()
    name: string

    @Column()
    state: string

    @Column()
    type: string
}
