const { db, firebase } = require('../src/config/firebase');

async function seedData() {
    console.log('🚀 Starting Firestore seeding...');

    try {
        // Mock Leads
        const leads = [
            {
                name: 'John Doe',
                company: 'Acme Corp',
                email: 'john@acme.com',
                phone: '+1 555-0123',
                budget: '$10k - $25k',
                project_type: 'AI Implementation',
                message: 'Looking to integrate AI into nuestro workflow.',
                status: 'New',
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            },
            {
                name: 'Jane Smith',
                company: 'Global Tech',
                email: 'jane@globaltech.io',
                phone: '+44 20 7946 0958',
                budget: '$50k+',
                project_type: 'Blockchain Solutions',
                message: 'Interested in scalable infrastructure.',
                status: 'Contacted',
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            },
            {
                name: 'Michael Chen',
                company: 'Innovate AI',
                email: 'm.chen@innovate.ai',
                phone: '+65 6789 0123',
                budget: '$25k - $50k',
                project_type: 'DevSecOps',
                message: 'Security is our top priority for this migration.',
                status: 'In Discussion',
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            }
        ];

        // Mock Contacts
        const contacts = [
            {
                name: 'Alice Johnson',
                email: 'alice@example.com',
                message: 'I really love your neo-minimalist design language!',
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            },
            {
                name: 'Robert White',
                email: 'robert@startup.co',
                message: 'Do you offer custom GSAP animation workshops?',
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            }
        ];

        console.log('📦 Seeding Leads...');
        for (const lead of leads) {
            try {
                const res = await db.collection('leads').add(lead);
                console.log(`✅ Added lead with ID: ${res.id}`);
            } catch (err) {
                console.error(`❌ Failed to add lead: ${lead.name}`, err.message);
                if (err.message.includes('permission-denied')) {
                    console.error('👉 PERMISSION DENIED: Please check your Firestore Security Rules. They must allow writes.');
                }
            }
        }

        console.log('📦 Seeding Contacts...');
        for (const contact of contacts) {
            try {
                const res = await db.collection('contacts').add(contact);
                console.log(`✅ Added contact with ID: ${res.id}`);
            } catch (err) {
                console.error(`❌ Failed to add contact: ${contact.name}`, err.message);
            }
        }

        console.log('✨ Firestore seeding completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    }
}

seedData();
