const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://postgres:kqJpIqANiFkXXQXfpzuvIyzBhcdSfdMM@zephyr.proxy.rlwy.net:40874/railway',
  ssl: { rejectUnauthorized: false }
});

pool.query('SELECT id, name, email FROM users')
  .then(r => {
    console.log('Users:', r.rows);
    pool.end();
  })
  .catch(e => {
    console.log('Error:', e.message);
    pool.end();
  });