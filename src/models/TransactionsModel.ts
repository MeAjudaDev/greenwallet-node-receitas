/* eslint-disable camelcase */
import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('transactions')
export default class Transactions {
    @PrimaryColumn()
    id: string

    @Column()
    user_id: string

    @Column()
    category_id: string

    @Column()
    description: string

    @Column()
    value: number

    @Column()
    is_fixed: boolean

    @Column()
    due_date: Date

    @Column()
    type: string

    @Column()
    state: string
}
