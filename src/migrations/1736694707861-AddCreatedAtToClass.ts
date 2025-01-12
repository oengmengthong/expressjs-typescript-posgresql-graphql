import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCreatedAtToClass1736694707861 implements MigrationInterface {
    name = 'AddCreatedAtToClass1736694707861'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "class" ADD "description" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "class" DROP COLUMN "description"`);
    }

}
