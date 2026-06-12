const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'symptomlens',
  password: 'admin123',
  port: 5432,
});

async function createUser() {
  const hashed = await bcrypt.hash('test123', 10);
  console.log('Hash created:', hashed);
  const result = await pool.query(
    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
    ['Test', 'direct@test.com', hashed]
  );
  console.log('User created:', result.rows[0]);
  pool.end();
}

createUser().catch(e => console.log('Error:', e.message));