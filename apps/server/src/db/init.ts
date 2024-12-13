import * as pg from "pg";
import { dbConfig } from "src/config/db.config";
const { Client } = pg;

const genderEnumQuery = `CREATE TYPE gender_enum AS ENUM('m','f','o')`;
const genreEnumQuery = `CREATE TYPE genre_enum AS ENUM('rnb','country','classic','rock','jazz')`;

const createUserTableQuery = `CREATE TABLE IF NOT EXISTS "user"(
id SERIAL PRIMARY KEY,
fist_name VARCHAR(255) NOT NULL,
last_name VARCHAR(255) NOT NULL,
email VARCHAR(255) UNIQUE NOT NULL,
password VARCHAR(500) NOT NULL,
phone VARCHAR(20),
dob DATE,
gender gender_enum,
address VARCHAR(255),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

const createArtistTableQuery = `CREATE TABLE IF NOT EXISTS artist (
id SERIAL PRIMARY KEY,
name VARCHAR(255) NOT NULL,
dob DATE,
gender gender_enum,
address VARCHAR(255),
first_release_year INTEGER CHECK(first_release_year >= 1000 AND first_release_year <= 9999),
no_of_albums_released INTEGER,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

const createMusicTableQuery = `CREATE TABLE IF NOT EXISTS music (
id serial primary key,
artist_id INTEGER REFERENCES artist(id) ON DELETE CASCADE,
title VARCHAR(255) NOT NULL,
album_name VARCHAR(255),
genre genre_enum,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

async function initializeDb() {
  try {
    console.log("Initializin database");
    const client = new Client(dbConfig);
    await client.connect();
    await client.query(genreEnumQuery);
    await client.query(genderEnumQuery);
    await client.query(createUserTableQuery);
    await client.query(createArtistTableQuery);
    await client.query(createMusicTableQuery);
    await client.end();
    console.log("Finished initializing database");
  } catch (err) {
    console.log(`Error while initializing database, ${err.message}`);
    process.exit();
  }
}
initializeDb();
