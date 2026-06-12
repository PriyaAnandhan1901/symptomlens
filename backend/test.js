const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'symptomlens',
  password: 'admin123',
  port: 5432,
});

pool.query('SELECT NOW()').then(r => {
  console.log('Connected!', r.rows[0]);
  pool.end();
}).catch(e => {
  console.log('Error:', e.message);
});