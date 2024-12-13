import * as pg from "pg";
import { dbConfig } from "src/config/db.config";

const { Pool } = pg;

export const pool = new Pool(dbConfig);
