const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');

router.post('/', leadController.submitLead);

module.exports = router;
