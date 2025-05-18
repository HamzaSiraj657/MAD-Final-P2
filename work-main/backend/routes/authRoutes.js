const express = require('express');
const { signup, login ,getAllUsers } = require('../controllers/authController');

const router = express.Router();

router.get('/users', getAllUsers);

router.post('/signup', signup);


router.post('/login', login);

module.exports = router;
