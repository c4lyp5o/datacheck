// Base
const express = require('express');
const router = express.Router();

// Controller
const generatecon = require ('../controllers/generateRetenController');

// Routes
router.get('/', generatecon.generate_menu);
router.get('/senaraidata', generatecon.showTadikaData);
router.get('/pindahData', generatecon.generateaAllData);
router.get('/pilihreten', generatecon.borangPilihReten);
router.post('/pilihreten', generatecon.borangPilihReten_post);
router.get('/pindahdataXlsxcount', generatecon.kiradataXlsx);
router.post('/pindahdata', generatecon.generateAllData_post );
router.get('/pindahdata/csv', generatecon.pindahDataCSV);
router.get('/pilihreten/generatereport', generatecon.reportAllTadika);
router.get('/try', generatecon.reportAllTadika);

module.exports = router;