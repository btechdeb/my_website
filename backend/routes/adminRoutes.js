const express = require('express');
const { getAdminDashboard } = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/dashboard', authMiddleware('admin'), getAdminDashboard);

module.exports = router;
