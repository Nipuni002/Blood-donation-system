const Pool = require('pg').Pool
require('dotenv').config()

const connectionString = process.env.DATABASE_URL

const pool = connectionString
  ? new Pool({ connectionString })
  : new Pool({
      host: process.env.PG_HOST || process.env.PGHOST || 'postgres',
      user: process.env.PG_USER || process.env.PGUSER || 'postgres',
      password: process.env.PG_PASSWORD || process.env.PGPASSWORD || 'example',
      database: process.env.PG_DATABASE || process.env.PGDATABASE || 'perndb',
      port: process.env.PG_PORT ? parseInt(process.env.PG_PORT, 10) : Number(process.env.PGPORT) || 5432,
    })

pool.on('error', (err) => {
  console.error('Unexpected error on idle pg client', err)
})

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
}
