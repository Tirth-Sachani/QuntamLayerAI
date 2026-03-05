require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
// Initialize Express app
const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route for testing
app.get('/api/v1/health', (req, res) => {
    res.status(200).json({ status: 'success', message: 'Enterprise Backend API is running' });
});

// Import and use routes
const contactRoutes = require('./routes/contactRoutes');
const leadRoutes = require('./routes/leadRoutes');
const authRoutes = require('./routes/authRoutes');
const adminLeadRoutes = require('./routes/adminLeadRoutes');

app.use('/api/v1/contact', contactRoutes);
app.use('/api/v1/lead', leadRoutes);
app.use('/api/v1/admin', authRoutes);
app.use('/api/v1/admin/leads', adminLeadRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
    const errorName = err.name || 'Error';
    const errorMessage = err.message || 'Server Error';
    const errorStack = process.env.NODE_ENV === 'development' ? err.stack : undefined;

    console.error(`Global Error Handler caught: [${errorName}] ${errorMessage}`);
    console.error(err.stack);

    res.status(err.status || 500).json({
        status: 'error',
        message: errorMessage,
        name: errorName,
        errorStack: errorStack
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
