const { db, firebase } = require('../config/firebase');

exports.submitContact = async (req, res, next) => {
    try {
        const { name, email, message } = req.body;

        // Basic validation
        if (!name || !email || !message) {
            return res.status(400).json({ status: 'error', message: 'Please provide all required fields' });
        }

        // Sanitize data
        const contactData = {
            name,
            email,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        };
        if (message) contactData.message = message;

        // Add document to "contacts" collection
        const docRef = await db.collection("contacts").add(contactData);

        res.status(201).json({
            status: 'success',
            message: 'Contact message received',
            id: docRef.id
        });
    } catch (error) {
        console.error("Firestore Error:", error);
        next(error);
    }
};
