const db = require('./db')

async function migrate() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS appointments (
        id SERIAL PRIMARY KEY,
        user_id INTEGER,
        donor_name TEXT,
        donor_contact TEXT,
        date DATE NOT NULL,
        time TEXT NOT NULL,
        location TEXT,
        notes TEXT,
        status VARCHAR(32) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP
      );
    `)
    console.log('appointments table ensured')
    process.exit(0)
  } catch (err) {
    console.error('Migration failed', err)
    process.exit(1)
  }
}

migrate()
