import {MigrationInterface, QueryRunner} from "typeorm";

export class actorupdate1575155732870 implements MigrationInterface {
    name = 'actorupdate1575155732870'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "temporary_actors" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "userId" integer, "name" text NOT NULL, "phone" integer NOT NULL, "email" text NOT NULL, "address" text NOT NULL, "city" text NOT NULL, "state" text NOT NULL, "zip" integer NOT NULL, "comments" text NOT NULL, "staff" boolean NOT NULL, "volunteer" boolean NOT NULL, "donor" boolean NOT NULL, "media" boolean NOT NULL, CONSTRAINT "FK_6e9f8dbdb17e464bb4aae82a157" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_actors"("id", "userId", "name", "phone", "email", "address", "city", "state", "zip", "comments") SELECT "id", "userId", "name", "phone", "email", "address", "city", "state", "zip", "comments" FROM "actors"`, undefined);
        await queryRunner.query(`DROP TABLE "actors"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_actors" RENAME TO "actors"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "actors" RENAME TO "temporary_actors"`, undefined);
        await queryRunner.query(`CREATE TABLE "actors" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "userId" integer, "name" text NOT NULL, "phone" integer NOT NULL, "email" text NOT NULL, "address" text NOT NULL, "city" text NOT NULL, "state" text NOT NULL, "zip" integer NOT NULL, "comments" text NOT NULL, CONSTRAINT "FK_6e9f8dbdb17e464bb4aae82a157" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`, undefined);
        await queryRunner.query(`INSERT INTO "actors"("id", "userId", "name", "phone", "email", "address", "city", "state", "zip", "comments") SELECT "id", "userId", "name", "phone", "email", "address", "city", "state", "zip", "comments" FROM "temporary_actors"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_actors"`, undefined);
    }

}
