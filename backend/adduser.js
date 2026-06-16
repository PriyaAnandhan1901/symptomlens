const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const pool = new Pool({
  connectionString: 'postgresql://postgres:kqJpIqANiFkXXQXfpzuvIyzBhcdSfdMM@zephyr.proxy.rlwy.net:40874/railway',
  ssl: { rejectUnauthorized: false }
});

async function main() {
  const hashed = await bcrypt.hash('test123', 10);
  await pool.query(
    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
    ['Test User', 'test@test.com', hashed]
  );
  console.log('User created successfully!');
  pool.end();
}

main().catch(e => {
  console.log('Error:', e.message);
  pool.end();
});