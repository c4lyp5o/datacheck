// Base
const express = require('express');
const router = express.Router();

// Controller
const generate_Reten = require ('../controllers/generateRetenController');

// Routes
router.get('/', generate_Reten.showTadikaData);
router.get('/pindahData', generate_Reten.pindahData);

module.exports = router;