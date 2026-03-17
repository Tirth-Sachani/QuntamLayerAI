const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Hardcoded admin credentials (hashed on first run)
const ADMIN_EMAIL = 'tirthsachani6105@gmail.com';
// Pre-hashed password for "Tirth@610205"
const ADMIN_PASSWORD_HASH = bcrypt.hashSync('Tirth@610205', 10);

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ status: 'error', message: 'Email and password are required' });
        }

        // Validate email
        if (email !== ADMIN_EMAIL) {
            return res.status(401).json({ status: 'error', message: 'Invalid credentials' });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
        if (!isMatch) {
            return res.status(401).json({ status: 'error', message: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign(
            { email: ADMIN_EMAIL, role: 'admin' },
            process.env.JWT_SECRET || 'quntamlayerai-secret-key-2026',
            { expiresIn: '1d' }
        );

        res.status(200).json({
            status: 'success',
            token,
            admin: { email: ADMIN_EMAIL }
        });
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ status: 'error', message: 'Server error' });
    }
};
