import {MigrationInterface, QueryRunner} from "typeorm";

export class eventsactors1574875036876 implements MigrationInterface {
    name = 'eventsactors1574875036876'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "temporary_events" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "userId" integer, "title" text NOT NULL, "location" text NOT NULL, "date" date NOT NULL, "description" text NOT NULL, "comments" text NOT NULL, CONSTRAINT "FK_9929fa8516afa13f87b41abb263" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_events"("id", "userId") SELECT "id", "userId" FROM "events"`, undefined);
        await queryRunner.query(`DROP TABLE "events"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_events" RENAME TO "events"`, undefined);
        await queryRunner.query(`CREATE TABLE "temporary_actors" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "userId" integer, "name" text NOT NULL, "phone" integer NOT NULL, "email" text NOT NULL, "address" text NOT NULL, "city" text NOT NULL, "state" text NOT NULL, "zip" integer NOT NULL, "comments" text NOT NULL, CONSTRAINT "FK_6e9f8dbdb17e464bb4aae82a157" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_actors"("id", "userId") SELECT "id", "userId" FROM "actors"`, undefined);
        await queryRunner.query(`DROP TABLE "actors"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_actors" RENAME TO "actors"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "actors" RENAME TO "temporary_actors"`, undefined);
        await queryRunner.query(`CREATE TABLE "actors" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "userId" integer, CONSTRAINT "FK_6e9f8dbdb17e464bb4aae82a157" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`, undefined);
        await queryRunner.query(`INSERT INTO "actors"("id", "userId") SELECT "id", "userId" FROM "temporary_actors"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_actors"`, undefined);
        await queryRunner.query(`ALTER TABLE "events" RENAME TO "temporary_events"`, undefined);
        await queryRunner.query(`CREATE TABLE "events" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "userId" integer, CONSTRAINT "FK_9929fa8516afa13f87b41abb263" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`, undefined);
        await queryRunner.query(`INSERT INTO "events"("id", "userId") SELECT "id", "userId" FROM "temporary_events"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_events"`, undefined);
    }

}
