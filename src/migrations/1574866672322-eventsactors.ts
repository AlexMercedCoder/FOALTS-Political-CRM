import {MigrationInterface, QueryRunner} from "typeorm";

export class eventsactors1574866672322 implements MigrationInterface {
    name = 'eventsactors1574866672322'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "events" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "userId" integer)`, undefined);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`, undefined);
        await queryRunner.query(`CREATE TABLE "actors" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "userId" integer)`, undefined);
        await queryRunner.query(`CREATE TABLE "actors_events_events" ("actorsId" integer NOT NULL, "eventsId" integer NOT NULL, PRIMARY KEY ("actorsId", "eventsId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_6809e72449302243c0c4fe5277" ON "actors_events_events" ("actorsId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_74453ab89e8e486795a9e83485" ON "actors_events_events" ("eventsId") `, undefined);
        await queryRunner.query(`CREATE TABLE "temporary_events" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "userId" integer, CONSTRAINT "FK_9929fa8516afa13f87b41abb263" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_events"("id", "userId") SELECT "id", "userId" FROM "events"`, undefined);
        await queryRunner.query(`DROP TABLE "events"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_events" RENAME TO "events"`, undefined);
        await queryRunner.query(`CREATE TABLE "temporary_actors" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "userId" integer, CONSTRAINT "FK_6e9f8dbdb17e464bb4aae82a157" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_actors"("id", "userId") SELECT "id", "userId" FROM "actors"`, undefined);
        await queryRunner.query(`DROP TABLE "actors"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_actors" RENAME TO "actors"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_6809e72449302243c0c4fe5277"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_74453ab89e8e486795a9e83485"`, undefined);
        await queryRunner.query(`CREATE TABLE "temporary_actors_events_events" ("actorsId" integer NOT NULL, "eventsId" integer NOT NULL, CONSTRAINT "FK_6809e72449302243c0c4fe5277d" FOREIGN KEY ("actorsId") REFERENCES "actors" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_74453ab89e8e486795a9e834857" FOREIGN KEY ("eventsId") REFERENCES "events" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, PRIMARY KEY ("actorsId", "eventsId"))`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_actors_events_events"("actorsId", "eventsId") SELECT "actorsId", "eventsId" FROM "actors_events_events"`, undefined);
        await queryRunner.query(`DROP TABLE "actors_events_events"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_actors_events_events" RENAME TO "actors_events_events"`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_6809e72449302243c0c4fe5277" ON "actors_events_events" ("actorsId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_74453ab89e8e486795a9e83485" ON "actors_events_events" ("eventsId") `, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP INDEX "IDX_74453ab89e8e486795a9e83485"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_6809e72449302243c0c4fe5277"`, undefined);
        await queryRunner.query(`ALTER TABLE "actors_events_events" RENAME TO "temporary_actors_events_events"`, undefined);
        await queryRunner.query(`CREATE TABLE "actors_events_events" ("actorsId" integer NOT NULL, "eventsId" integer NOT NULL, PRIMARY KEY ("actorsId", "eventsId"))`, undefined);
        await queryRunner.query(`INSERT INTO "actors_events_events"("actorsId", "eventsId") SELECT "actorsId", "eventsId" FROM "temporary_actors_events_events"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_actors_events_events"`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_74453ab89e8e486795a9e83485" ON "actors_events_events" ("eventsId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_6809e72449302243c0c4fe5277" ON "actors_events_events" ("actorsId") `, undefined);
        await queryRunner.query(`ALTER TABLE "actors" RENAME TO "temporary_actors"`, undefined);
        await queryRunner.query(`CREATE TABLE "actors" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "userId" integer)`, undefined);
        await queryRunner.query(`INSERT INTO "actors"("id", "userId") SELECT "id", "userId" FROM "temporary_actors"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_actors"`, undefined);
        await queryRunner.query(`ALTER TABLE "events" RENAME TO "temporary_events"`, undefined);
        await queryRunner.query(`CREATE TABLE "events" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "userId" integer)`, undefined);
        await queryRunner.query(`INSERT INTO "events"("id", "userId") SELECT "id", "userId" FROM "temporary_events"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_events"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_74453ab89e8e486795a9e83485"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_6809e72449302243c0c4fe5277"`, undefined);
        await queryRunner.query(`DROP TABLE "actors_events_events"`, undefined);
        await queryRunner.query(`DROP TABLE "actors"`, undefined);
        await queryRunner.query(`DROP TABLE "user"`, undefined);
        await queryRunner.query(`DROP TABLE "events"`, undefined);
    }

}
