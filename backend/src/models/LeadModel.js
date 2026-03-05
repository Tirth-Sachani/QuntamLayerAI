const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
    name: { type: String, required: true },
    company: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    budget: { type: String },
    project_type: { type: String },
    message: { type: String },
    status: { type: String, enum: ['new', 'contacted', 'qualified', 'proposal', 'closed'], default: 'new' }
}, { timestamps: true });

module.exports = mongoose.model('Lead', leadSchema);
