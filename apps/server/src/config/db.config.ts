import { DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from "src/config/env.config";

export const dbConfig = {
  host: "localhost",
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: DB_PORT,
};
