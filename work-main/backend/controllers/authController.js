const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');


const getAllUsers = (req, res) => {
  db.query('SELECT id, Email,password, role FROM users', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch users' });
    }
    res.json(results);
  });
};



const signup = (req, res) => {
  const { Email, password, role = 'user' } = req.body;


  if (!Email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }


  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return res.status(500).json({ error: 'Error hashing password' });

    db.query(
      'INSERT INTO users (Email, password, role) VALUES (?, ?, ?)',
      [Email, hash, role],
      (err, result) => {
        if (err) return res.status(500).json({ error: 'Failed to register user' });
        res.status(201).json({ message: 'User registered successfully' });
      }
    );
  });
};


const login = (req, res) => {
  const { Email, password } = req.body;

  
  db.query('SELECT * FROM users WHERE Email = ?', [Email], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (results.length === 0) return res.status(401).json({ error: 'Invalid Email or password' });

    const user = results[0];

    
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) return res.status(500).json({ error: 'Error comparing password' });
      if (!result) return res.status(401).json({ error: 'Invalid Email or password' });

      
      const token = jwt.sign({ id: user.id, Email: user.Email, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      res.json({
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          Email: user.Email,
          role: user.role
        }
      });
    });
  });
};

module.exports = {
  signup,
  login,
  getAllUsers,
};
