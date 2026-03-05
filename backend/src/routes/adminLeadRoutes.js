const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const adminLeadController = require('../controllers/adminLeadController');

// All routes are protected by auth middleware
router.use(authMiddleware);

router.get('/', adminLeadController.getAllLeads);
router.get('/:id', adminLeadController.getLeadById);
router.put('/:id', adminLeadController.updateLeadStatus);
router.delete('/:id', adminLeadController.deleteLead);

module.exports = router;
