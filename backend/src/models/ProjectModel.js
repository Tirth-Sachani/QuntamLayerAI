const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    technology_stack: [{ type: String }],
    results: { type: String },
    client_name: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
