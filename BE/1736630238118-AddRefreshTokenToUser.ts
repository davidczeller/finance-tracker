import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRefreshTokenToUser1736630238118 implements MigrationInterface {
    name = 'AddRefreshTokenToUser1736630238118'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "refresh_token" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "refresh_token" SET DEFAULT ''`);
    }

}
