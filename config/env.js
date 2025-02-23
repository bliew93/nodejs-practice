import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

export const {
  BASE_URL,
  PORT,
  NODE_ENV,
  POSTGRES_USERNAME,
  POSTGRES_PASSWORD,
  POSTGRES_HOST,
  POSTGRESS_PORT,
  POSTGRES_DB_NAME,
} = process.env;
