'use strict';
const TadikaData = require('../models/Tadika');
// const YAData = require('../models/Sekolah'); to put in the future
// const YAData = require('../models/YA'); to put in the future
const fs = require('fs');
const moment = require('moment');
const json2csv = require('json2csv').parse;
const fields = ['namaPendaftaranTadika', 'namaTaskaTadikaPendaftaranTadika'];
const path = require('path');
const Excel = require('exceljs');
const { count } = require('console');

// Display list of all Tadika Kids.
exports.showTadikaData = function(req, res) {
    TadikaData.find()
      .sort([['namaPendaftaranTadika', 'ascending']])
      .exec(function (err, list_budak) {
        if (err) { return next(err); }
        //Successful, so render
        res.render('tadika_list', { title: 'Semua budak tadika', budak_list: list_budak });
      });
};

// Export data in csv format
exports.pindahData = function(req, res) {
    TadikaData.find()
    .sort([['namaPendaftaranTadika', 'ascending']])
    .exec(function (err, list_budak) {
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
        const filePath = path.join(__dirname, "..", "public", "exports", "csv-" + dateTime + ".csv")
        fs.writeFile(filePath, csv, function (err) {
          if (err) {
            return res.json(err).status(500);
          }
          else {
            setTimeout(function () {
              fs.unlinkSync(filePath); // delete this file after 30 seconds
            }, 30000)
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
    let row = await worksheet.getRow(3);
    console.log('done await');
    row.getCell(1).value = 'alhamdulillah';
    row.getCell(2).value = 'subhanAllah';
    row.getCell(3).value = 'Allahuakbar';
    row.commit();
    const dateTime = moment().format('YYYYMMDDhhmmss');
    let newfile = path.join(__dirname, "..", "public", "exports", "CRA-" + dateTime + ".xlsx");
    await workbook.xlsx.writeFile(newfile);
    res.download(newfile);
}

// Export data in xlsx format
// exports.pindahDataXlsx = function(req, res) {

//     // read the file
//     const workbook = new Excel.Workbook();
//     workbook.xslx.readFile(path.join(__dirname, "..", "public", "exports", "CRA.xlsx"));

//     // get the data
//     TadikaData.save(function (err, res) {
//         if (err) {
//             console.log('Error: ' + err);
//         } else {
//             const count = TadikaData.count({});
//             const worksheet = workbook.getWorksheet('Sheet1');
//             const row = worksheet.getRow(1);
//             row.getCell(1).value = 'Nama Pendaftaran Tadika';
//             row.getCell(2).value = 'Nama Taska Tadika Pendaftaran Tadika';
//             row.commit();
//             return workbook.xlsx.writeFile(path.join(__dirname, "..", "public", "exports", "CRA.xlsx"));
//             res.download(path.join(__dirname, "..", "public", "exports", "CRA.xlsx"));
//         }
//     });
// };

//             const count = await TadikaData.count({});
//             TadikaData.countDocuments({}, function(err, count) {
//                 console.log('Count is ' + count);

//                 // get the sheet

//                 const worksheet = workbook.getWorksheet('Sheet1');

//                 // get the cell

//                 const cell = worksheet.getCell('A1');

//                 // set the value

//                 cell.value = count;
//                 res.download(path.join(__dirname, "..", "public", "exports", "CRA.xlsx"));
//                 });
//             }
//     });
// }
