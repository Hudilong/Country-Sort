import pkg from "pg";

const { POSTGRES_USER, POSTGRES_DB, POSTGRES_PASSWORD, PG_HOST } = process.env;

const { Pool } = pkg;

export const pool = new Pool({
    user: POSTGRES_USER,
    host: PG_HOST,
    database: POSTGRES_DB,
    password: POSTGRES_PASSWORD,
    port: 5432, // Default PostgreSQL port
});
