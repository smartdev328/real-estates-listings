import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateListings1710419735404 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS listings (
        id SERIAL PRIMARY KEY,
        brokertitle VARCHAR(255),
        type VARCHAR(255),
        price NUMERIC,
        beds INTEGER,
        bath INTEGER,
        propertysqft NUMERIC,
        address VARCHAR(255),
        state VARCHAR(255),
        main_address VARCHAR(255),
        administrative_area_level_2 VARCHAR(255),
        locality VARCHAR(255),
        sublocality VARCHAR(255),
        street_name VARCHAR(255),
        long_name VARCHAR(255),
        formatted_address VARCHAR(255),
        latitude NUMERIC,
        longitude NUMERIC,
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "listings"`, undefined);
  }
}
