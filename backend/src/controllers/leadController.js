const { db, firebase } = require('../config/firebase');
const emailService = require('../services/emailService');

exports.submitLead = async (req, res, next) => {
    console.log("Submit Lead Request Body:", req.body);
    try {
        const { name, company, email, phone, budget, project_type, message, nda } = req.body;

        // Basic validation
        if (!name || !company || !email) {
            return res.status(400).json({ status: 'error', message: 'Name, company, and email are required' });
        }

        // Prepare data - filter out undefined to avoid Firestore errors
        const leadData = {
            name,
            company,
            email,
            status: 'new',
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        };

        if (phone) leadData.phone = phone;
        if (budget) leadData.budget = budget;
        if (project_type) leadData.project_type = project_type;
        if (message) leadData.message = message;
        if (nda !== undefined) leadData.nda = nda;

        // 1. Save to Firestore
        const docRef = await db.collection("leads").add(leadData);
        console.log("✅ Lead saved to Firestore:", docRef.id);

        // 2. Send email notification (non-blocking)
        const notificationData = { name, company, email, phone, budget, project_type, message, nda };
        emailService.sendProposalNotification(notificationData).catch(err => {
            console.error("❌ Email notification failed:", err.message);
        });

        // 3. Respond immediately
        res.status(201).json({
            status: 'success',
            message: 'Proposal submitted successfully',
            lead_id: docRef.id
        });
    } catch (error) {
        console.error("Firestore Error:", error);
        next(error);
    }
};
