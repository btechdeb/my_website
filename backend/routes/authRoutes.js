const express = require('express');
const { login } = require('../controllers/authController');
const router = express.Router();

router.get('/login', (req, res) => res.render('login'));
router.post('/login', login);

module.exports = router;
