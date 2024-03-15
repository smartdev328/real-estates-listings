import bcrypt from 'bcryptjs';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsers1710384875950 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS users ("id" SERIAL NOT NULL, "email" character varying(100) NOT NULL, "password" character varying NOT NULL, "role" character varying(10) NOT NULL DEFAULT 'USER', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );

    const email = 'admin@admin.com';
    const password = bcrypt.hashSync('password', 8);
    await queryRunner.query(`
      INSERT INTO users (email, password, role)
      VALUES ('${email}', '${password}', 'ADMIN');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`, undefined);
  }
}
