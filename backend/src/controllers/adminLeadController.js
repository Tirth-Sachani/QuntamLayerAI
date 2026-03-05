const { db } = require('../config/firebase');

// GET all leads
exports.getAllLeads = async (req, res) => {
    try {
        const snapshot = await db.collection('leads').orderBy('createdAt', 'desc').get();
        const leads = [];

        snapshot.forEach(doc => {
            leads.push({ id: doc.id, ...doc.data() });
        });

        res.status(200).json({ status: 'success', count: leads.length, leads });
    } catch (error) {
        console.error('Get Leads Error:', error);
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// GET single lead by ID
exports.getLeadById = async (req, res) => {
    try {
        const doc = await db.collection('leads').doc(req.params.id).get();

        if (!doc.exists) {
            return res.status(404).json({ status: 'error', message: 'Lead not found' });
        }

        res.status(200).json({ status: 'success', lead: { id: doc.id, ...doc.data() } });
    } catch (error) {
        console.error('Get Lead Error:', error);
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// PUT update lead status
exports.updateLeadStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const validStatuses = ['New', 'Contacted', 'In Discussion', 'Closed'];

        if (!status || !validStatuses.includes(status)) {
            return res.status(400).json({
                status: 'error',
                message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
            });
        }

        const docRef = db.collection('leads').doc(req.params.id);
        const doc = await docRef.get();

        if (!doc.exists) {
            return res.status(404).json({ status: 'error', message: 'Lead not found' });
        }

        await docRef.update({ status });

        res.status(200).json({ status: 'success', message: 'Lead status updated', lead: { id: doc.id, ...doc.data(), status } });
    } catch (error) {
        console.error('Update Lead Error:', error);
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// DELETE lead
exports.deleteLead = async (req, res) => {
    try {
        const docRef = db.collection('leads').doc(req.params.id);
        const doc = await docRef.get();

        if (!doc.exists) {
            return res.status(404).json({ status: 'error', message: 'Lead not found' });
        }

        await docRef.delete();

        res.status(200).json({ status: 'success', message: 'Lead deleted' });
    } catch (error) {
        console.error('Delete Lead Error:', error);
        res.status(500).json({ status: 'error', message: error.message });
    }
};
