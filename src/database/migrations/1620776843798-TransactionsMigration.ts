import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class TransactionsMigration1620776843798 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.createTable(new Table({
      name: 'transactions',
      columns: [
        {
          name: 'id',
          type: 'varchar',
          isPrimary: true
        },
        {
          name: 'user_id',
          type: 'varchar'
        },
        {
          name: 'category_id',
          type: 'varchar'
        },
        {
          name: 'description',
          type: 'varchar'
        },
        {
          name: 'value',
          type: 'decimal',
          precision: 15,
          scale: 2
        },
        {
          name: 'is_fixed',
          type: 'boolean'
        },
        {
          name: 'due_date',
          type: 'date'
        },
        {
          name: 'type',
          type: 'varchar',
          length: '1'
        },
        {
          name: 'state',
          type: 'varchar',
          length: '1'
        },
        {
          name: 'update_At',
          type: 'timestamp',
          default: 'now()',
          onUpdate: 'now()'
        },
        {
          name: 'created_At',
          type: 'timestamp',
          default: 'now()'
        }
      ]
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.dropTable('transactions')
  }
}
