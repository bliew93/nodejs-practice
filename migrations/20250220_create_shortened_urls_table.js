import pgPool from "../config/db.js";

const client = await pgPool.connect();

export async function up() {
  try {
    await client.query("BEGIN");
    await client.query("CREATE EXTENSION IF NOT EXISTS pgcrypto");
    await pgPool.query(`
      CREATE TABLE IF NOT EXISTS shortened_urls (
      ID UUID PRIMARY KEY,
      url TEXT);`);

    await client.query(
      "INSERT INTO migrations (migration, status) Values('20250220_create_shortened_urls_table', 'Up')"
    );
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

export async function down() {
  try {
    await client.query("BEGIN");
    await client.query("DROP TABLE IF EXISTS shortened_urls;");

    await client.query(
      "INSERT INTO migrations (migration, status) Values('20250220_create_shortened_urls_table', 'Down');"
    );

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}
