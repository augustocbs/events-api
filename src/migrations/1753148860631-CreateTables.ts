import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1753148860631 implements MigrationInterface {
    name = 'CreateTables1753148860631'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "participants" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, CONSTRAINT "PK_1cda06c31eec1c95b3365a0283f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "events" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "date" TIMESTAMP NOT NULL, CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "event_participants" ("event_id" integer NOT NULL, "participant_id" integer NOT NULL, CONSTRAINT "PK_b07029722f5a8c4f36e22a7570d" PRIMARY KEY ("event_id", "participant_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b5349807aae71193d0cc0f52e3" ON "event_participants" ("event_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_793c3a8cbacfe55fd1176ae2a4" ON "event_participants" ("participant_id") `);
        await queryRunner.query(`ALTER TABLE "event_participants" ADD CONSTRAINT "FK_b5349807aae71193d0cc0f52e35" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "event_participants" ADD CONSTRAINT "FK_793c3a8cbacfe55fd1176ae2a4b" FOREIGN KEY ("participant_id") REFERENCES "participants"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event_participants" DROP CONSTRAINT "FK_793c3a8cbacfe55fd1176ae2a4b"`);
        await queryRunner.query(`ALTER TABLE "event_participants" DROP CONSTRAINT "FK_b5349807aae71193d0cc0f52e35"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_793c3a8cbacfe55fd1176ae2a4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b5349807aae71193d0cc0f52e3"`);
        await queryRunner.query(`DROP TABLE "event_participants"`);
        await queryRunner.query(`DROP TABLE "events"`);
        await queryRunner.query(`DROP TABLE "participants"`);
    }

}
