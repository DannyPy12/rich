const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bodyParser = require('body-parser');

router.use(bodyParser.json());

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Request received with email:', email, 'and password:', password);

  try {
    const user = await User.findOne({ where: { email } });
    console.log('User found:', user);

    if (user) {
      console.log('Stored password:', user.password);
      if (user.password === password) {
        console.log('Passwords match');
        res.status(200).json({ message: 'Login successful' });
      } else {
        console.log('Passwords do not match');
        res.status(401).json({ message: 'Invalid email or password' });
      }
    } else {
      console.log('User not found');
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
