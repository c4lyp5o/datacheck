'use strict';
const Tadika = require('../models/Tadika');
const Helper = require('./excelHelper');
const countHelper = require('./countHelper');
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
    res.redirect('/generate/pindahdata/xlsx');
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
  // var search = '';
  // Get all tadikas and kelas
  Tadika.distinct('namaTaskaTadikaPendaftaranTadika', {nama: new RegExp('')}, function(err, listtadika) {
    if (err) { return next(err); }
    // Successful, so render
    // console.log(listtadika); debug purposes
    res.render('generatereten', { title: 'Hasilkan Reten', tadikas: listtadika });
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

// Display form for Negeri to give overview
exports.borangOverview = function(req, res) {
  // var search = '';
  // Get all tadikas and kelas
  Tadika.distinct('createdByNegeri', {nama: new RegExp('')}, function(err, listnegeri) {
    if (err) { return next(err); }
    // Successful, so render
    // console.log(listtadika); debug purposes
    res.render('overview', { title: 'Overview mengikut negeri', negeri: listnegeri });
  });
};

// Post route for borangOverview
exports.borangOverview_post = async function(req, res, negeri) {
  await Helper.prepareDocumentLaporan(req, res);
  countHelper.overView(req, res, negeri);
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
            fs.unlinkSync(filePath); // delete this file after 60 seconds
          }, 60000)
          const XLSX_file = path.join(__dirname, "..", "public", "exports", `FullData-${dateTime}.xlsx`);
          let csvtobook = new Excel.Workbook();
          csvtobook.csv.readFile(filePath).then(worksheet => {
            console.log(worksheet.getRow(1).getCell(1).value);
            csvtobook.xlsx.writeFile(XLSX_file);
          })          
          setTimeout(function () {
            fs.unlinkSync(XLSX_file); // delete this file after 30 seconds
          }, 30000)
          setTimeout(function () {
            res.download(XLSX_file);
          }, 3000)
        }
      });  
    }
  })
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
