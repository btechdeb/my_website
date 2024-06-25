const express = require('express');
const { getUserDashboard } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/dashboard', authMiddleware('user'), getUserDashboard);

module.exports = router;
