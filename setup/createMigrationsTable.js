import pgPool from "../config/db.js";

const createMigrationsTable = async () => {
  const result = await pgPool.query(`
		CREATE TYPE statusEnum AS ENUM('Up','Down');
	
		CREATE TABLE IF NOT EXISTS migrations (
			ID SERIAL PRIMARY KEY,
			migration VARCHAR(255),
			status statusEnum DEFAULT 'Down'
		);`);

  console.log(result.rows[0].name);
};

export default createMigrationsTable;
