import pgPool from "../config/db.js";

const client = await pgPool.connect();

export async function up() {
  try {
    await client.query("BEGIN");
    await client.query("CREATE EXTENSION IF NOT EXISTS pgcrypto");
    await pgPool.query(`
      CREATE TABLE IF NOT EXISTS todos (
      ID UUID PRIMARY KEY,
      body TEXT);`);

    await client.query(
      "INSERT INTO migrations (migration, status) Values('20250225_create_todos_table', 'Up')"
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
    await client.query("DROP TABLE IF EXISTS todos;");

    await client.query(
      "INSERT INTO migrations (migration, status) Values('20250225_create_todos_table', 'Down');"
    );

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}
