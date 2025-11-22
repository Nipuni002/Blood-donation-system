const { Pool } = require('pg');
require('dotenv').config();

// Prefer single DATABASE_URL if provided; else fall back to discrete vars.
// In Docker compose the hostname must be the service name 'postgres'.
const connectionString = process.env.DATABASE_URL;

const pool = connectionString
    ? new Pool({ connectionString })
    : new Pool({
            host: process.env.PGHOST || process.env.PG_HOST || 'postgres',
            user: process.env.PGUSER || process.env.PG_USER || 'postgres',
            password: process.env.PGPASSWORD || process.env.PG_PASSWORD || 'example',
            database: process.env.PGDATABASE || process.env.PG_DATABASE || 'perndb',
            port: Number(process.env.PGPORT || process.env.PG_PORT) || 5432,
        });

pool.on('error', (err) => {
    console.error('[Auth-Service] PG pool error', err);
});

module.exports = pool;

