const jwt = require('jsonwebtoken');

module.exports = function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ status: 'error', message: 'Unauthorized — no token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'quntamlayerai-secret-key-2026');
        req.admin = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ status: 'error', message: 'Invalid or expired token' });
    }
};
