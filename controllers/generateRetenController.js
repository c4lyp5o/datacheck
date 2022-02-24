'use strict';
const Tadika = require('../models/Tadika');
// const YAData = require('../models/Sekolah'); to put in the future
// const YAData = require('../models/YA'); to put in the future
const fs = require('fs');
const moment = require('moment');
const json2csv = require('json2csv').parse;
const fields = ['namaPendaftaranTadika', 'namaTaskaTadikaPendaftaranTadika', 'umurPendaftaranTadika', 'kelasPendaftaranTadika'];
const path = require('path');
const Excel = require('exceljs');

// Display generate menu
exports.generate_menu = function(req, res) {
  res.render('generateindex', { title: 'Laman Manipulasi Data' });
}

// Display generate menu for all data
exports.generateaAllData = function(req, res) {
  res.render('generateall', { title: 'Download Semua Data' });
}

// Post route for generate menu for all data
exports.generateAllData_post = function(req, res) {
  if (req.body.jenisFile == 'CSV') {
    res.redirect('/generate/pindahdata/csv');
  } else {
    console.log('masuk ke xlsx');
    res.send('NOT YET IMPLEMENTED');
  }
};

// Display list of all Tadika Kids.
exports.showTadikaData = function(req, res) {
    Tadika.find()
      .sort([['namaPendaftaranTadika', 'ascending']])
      .exec(function (err, list_budak) {
        if (err) { return next(err); }
        //Successful, so render
        res.render('tadika_list', { title: 'Semua budak tadika', budak_list: list_budak });
      });
};

// Display form for tadika to generate reten
exports.borangPilihReten = function(req, res) {
  var search = 'Tabika Kemas Taman Nilam';
  // Get all tadikas and kelas
  Tadika.distinct('namaTaskaTadikaPendaftaranTadika', {nama: new RegExp(search)}, function(err, listtadika) {
    if (err) { return next(err); }
    // Successful, so render
    // console.log(listtadika); debug purposes
    res.render('generatereten', { title: 'Generate Reten', tadikas: listtadika });
  });
};

// Post route for borangPilihReten
exports.borangPilihReten_post = function(req, res) {
  var x = req.body.tadikaNama;
  var y = req.body.jenisReten
  console.log(req.body.tadikaNama);
  console.log(req.body.jenisReten);
  res.send('Hello ' + x + ' & ' + y);
};

// Export data in csv format
exports.pindahDataCSV = function(req, res) {
    Tadika.find().sort([['namaPendaftaranTadika', 'ascending']]).exec(function (err, list_budak) {
      if (err) {
        return res.status(500).json({ err });
      }
      else {
        let csv
        try {
          csv = json2csv(list_budak, { fields });
        } catch (err) {
          return res.status(500).json({ err });
        }
        const dateTime = moment().format('YYYYMMDDhhmmss');
        const filePath = path.join(__dirname, "..", "public", "exports", `FullData-${dateTime}.csv`)
        fs.writeFile(filePath, csv, function (err) {
          if (err) {
            return res.json(err).status(500);
          }
          else {
            setTimeout(function () {
              fs.unlinkSync(filePath); // delete this file after 10 seconds
            }, 10000)
            res.download(filePath);
          }
        });  
      }
    })
};

// Export data in xlsx format
exports.pindahDataXlsx = async function(req, res) {
    let filename = path.join(__dirname, "..", "public", "exports", "CRA.xlsx");
    let workbook = new Excel.Workbook();
    await workbook.xlsx.readFile(filename);
    let worksheet = workbook.getWorksheet('Sheet1');
    let row = worksheet.getRow(3);
    console.log('done getting row');
    row.getCell(1).value = 'alhamdulillah';
    row.getCell(2).value = 'subhanAllah';
    row.getCell(3).value = 'Allahuakbar';
    row.commit();
    const dateTime = moment().format('YYYYMMDDhhmmss');
    let newfile = path.join(__dirname, "..", "public", "exports", "CRA-" + dateTime + ".xlsx");
    await workbook.xlsx.writeFile(newfile);
    setTimeout(function () {
      fs.unlinkSync(newfile); // delete this file after 10 seconds
    }, 10000)
    res.download(newfile);
}

// Count data and export in xlsx format
exports.kiradataXlsx = async function(req, res) {
  Tadika.countDocuments().exec( async function (err, count) {
    if (err) {
      return res.status(500).json({ err });
    }
    else {
      console.log(count);
      let filename = path.join(__dirname, "..", "public", "exports", "CRA.xlsx");
      let workbook = new Excel.Workbook();
      await workbook.xlsx.readFile(filename);
      let worksheet = workbook.getWorksheet('Sheet1');
      let row = worksheet.getRow(2);
      row.getCell(1).value = count;
      row.commit();
      const dateTime = moment().format('YYYYMMDDhhmmss');
      let newfile = path.join(__dirname, "..", "public", "exports", "CRA-" + dateTime + ".xlsx");
      await workbook.xlsx.writeFile(newfile);
      setTimeout(function () {
        fs.unlinkSync(newfile); // delete this file after 10 seconds
      }, 10000)
      res.download(newfile);
    }
  }
)};