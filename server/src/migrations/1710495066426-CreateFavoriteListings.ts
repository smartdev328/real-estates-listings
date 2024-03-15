import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFavoriteListings1710495066426 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE favoritelistings (
        id SERIAL PRIMARY KEY,
        user_id INTEGER,
        listing_id INTEGER,
        FOREIGN KEY (user_id) REFERENCES "users" (id),
        FOREIGN KEY (listing_id) REFERENCES "listings" (id)
      );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "favoritelistings"`, undefined);
  }
}
