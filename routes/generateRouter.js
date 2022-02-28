// Base
const express = require('express');
const router = express.Router();

// Controller
const generatecon = require ('../controllers/generateRetenController');
const countcon = require ('../controllers/countHelper');
const { route } = require('./indexRouter');

// Routes
router.get('/', generatecon.generate_menu);
router.get('/senaraidata', generatecon.showTadikaData);
router.get('/pindahData', generatecon.generateaAllData);
router.get('/pilihreten', generatecon.borangPilihReten);
router.post('/pilihreten', generatecon.borangPilihReten_post);
router.get('/pindahdataXlsxcount', generatecon.kiradataXlsx);
router.post('/pindahdata', generatecon.generateAllData_post );
router.get('/pindahdata/csv', generatecon.pindahDataCSV);
router.get('/pilihreten/generatereport', generatecon.reportforTadika);
router.get('/try', generatecon.reportforTadika);
router.get('/kedah', generatecon.reportforTadika);

module.exports = router;