const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://postgres:kqJpIqANiFkXXQXfpzuvIyzBhcdSfdMM@zephyr.proxy.rlwy.net:40874/railway',
  ssl: { rejectUnauthorized: false }
});

async function setup() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(100) UNIQUE,
      password VARCHAR(255)
    );
    CREATE TABLE IF NOT EXISTS symptoms (
      id SERIAL PRIMARY KEY,
      user_id INTEGER,
      symptom_name VARCHAR(100),
      severity INTEGER,
      notes TEXT,
      logged_at TIMESTAMP DEFAULT NOW()
    );
    CREATE TABLE IF NOT EXISTS checkins (
      id SERIAL PRIMARY KEY,
      user_id INTEGER,
      sleep_hours FLOAT,
      stress_level INTEGER,
      mood VARCHAR(50),
      checked_in_at TIMESTAMP DEFAULT NOW()
    );
  `);
  console.log('Tables created successfully!');
  pool.end();
}

setup().catch(e => {
  console.log('Error:', e.message);
  pool.end();
});