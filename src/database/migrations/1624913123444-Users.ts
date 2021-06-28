import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Users1624913123444 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: "users",
              columns: [
                {
                  name: "id",
                  type: "int",
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: 'increment'
                },
                {
                  name: "name",
                  type: "varchar",
                },
                {
                  name: "email",
                  type: "varchar",
                },
                {
                  name: "password",
                  type: "varchar",
                },
                {
                  name: "activation_code",
                  type: "varchar",
                  default: '"P"',
                },
                {
                  name: "updated_at",
                  type: "timestamp",
                  default: "now()",
                },
                {
                  name: "created_at",
                  type: "timestamp",
                  default: "now()",
                },
              ],
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
