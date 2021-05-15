import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CategoriesMigration1620957797286 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.createTable(new Table({
      name: 'categories',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment'
        },
        {
          name: 'user_id',
          type: 'int',
          isNullable: false
        },
        {
          name: 'name',
          type: 'varchar',
          isNullable: false
        },
        {
          name: 'state',
          type: 'char',
          default: '"A"'
        },
        {
          name: 'type',
          type: 'char',
          isNullable: false
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
    return await queryRunner.dropTable('categories')
  }
}
