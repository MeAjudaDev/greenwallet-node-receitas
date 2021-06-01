import { MigrationInterface, QueryRunner } from 'typeorm'

export class foreignKeyTransactionsCategories1622434749880 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE transactions add CONSTRAINT fk_category_id FOREIGN KEY (category_id) 
                            references categories(id) ON DELETE CASCADE;
    `)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE transactions drop foreign key fk_category_id;')
  }
}
