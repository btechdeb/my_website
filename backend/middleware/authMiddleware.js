const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = (role) => async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).redirect('/auth/login');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.user.id);

        if (req.user.role !== role) {
            return res.status(403).send('Access denied');
        }

        next();
    } catch (err) {
        console.error(err.message);
        res.status(401).send('Invalid token');
    }
};

module.exports = authMiddleware;
