import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1736693541652 implements MigrationInterface {
    name = 'InitialMigration1736693541652'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "student" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "age" integer NOT NULL, "classId" uuid, CONSTRAINT "PK_3d8016e1cb58429474a3c041904" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "class" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, CONSTRAINT "PK_0b9024d21bdfba8b1bd1c300eae" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "FK_bd5c8f2ef67394162384a484ba1" FOREIGN KEY ("classId") REFERENCES "class"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "FK_bd5c8f2ef67394162384a484ba1"`);
        await queryRunner.query(`DROP TABLE "class"`);
        await queryRunner.query(`DROP TABLE "student"`);
    }

}
