const Tadika = require('../models/Tadika');
const async = require('async');
// const Sekolah = require('../models/Sekolah'); to put in the future
// const YAdult = require('../models/YA'); to put in the future

// Get all data
exports.getAllDataforDashboard = function(req, res) {
  async.parallel({
      jumlahPelajar: function(callback) {
          Tadika.countDocuments(callback);
      },
      listTadika: function(callback) {
          Tadika.distinct('namaTaskaTadikaPendaftaranTadika', {nama: new RegExp('')}, callback);
      },
      listTN: function(callback) {
        Tadika.countDocuments({ namaTaskaTadikaPendaftaranTadika: 'Tabika Kemas Taman Nilam' }, callback);
      },
      listTNuri: function(callback) {
        Tadika.countDocuments({ namaTaskaTadikaPendaftaranTadika: 'Tabika Kemas Taman Nuri' }, callback);
      },
      listTWJ: function(callback) {
        Tadika.countDocuments({ namaTaskaTadikaPendaftaranTadika: 'Tabika Kemas Teluk Wanjah' }, callback);
      },
      listTT: function(callback) {
        Tadika.countDocuments({ namaTaskaTadikaPendaftaranTadika: 'Tabika Kemas Tualang' }, callback);
      },
      listUmur4 : function(callback) {
        Tadika.countDocuments({ umurPendaftaranTadika: '4' }, callback);
      },
      listUmur5 : function(callback) {
        Tadika.countDocuments({ umurPendaftaranTadika: '5' }, callback);
      },
      listUmur6 : function(callback) {
        Tadika.countDocuments({ umurPendaftaranTadika: '6' }, callback);
      },
  }, function(err, results) {
      if (err) { return next(err); }
      res.render('index', { title: 'Laman Tadika', jumlahPelajar: results.jumlahPelajar, namaTadika: results.listTadika, jTN: results.listTN, jTNuri: results.listTNuri, jTWJ: results.listTWJ, jTT: results.listTT, jumlahUmur4: results.listUmur4, jumlahUmur5: results.listUmur5, jumlahUmur6: results.listUmur6 });
  });
};