const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('./db');

// SIGNUP
router.post('/signup', async (req, res) => {
  try {
    console.log('Signup called');
    console.log('Body:', req.body);
    const { name, email, password } = req.body;
    console.log('name:', name, 'email:', email, 'password:', password);
    console.log('password type:', typeof password);
    const hashed = await bcrypt.hash(password, 10);
    console.log('Hash created:', hashed);
    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email, hashed]
    );
    res.json({ message: 'User created!', user: result.rows[0] });
  } catch (err) {
    console.log('ERROR:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'User not found' });
    }
    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: 'Wrong password' });
    }
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'symptomlens_secret',
      { expiresIn: '7d' }
    );
    res.json({ message: 'Login successful!', token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;