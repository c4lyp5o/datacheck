'use strict';
const TadikaData = require('../models/Tadika');
// const YAData = require('../models/Sekolah'); to put in the future
// const YAData = require('../models/YA'); to put in the future
const fs = require('fs');
const moment = require('moment');
const json2csv = require('json2csv').parse;
const fields = ['namaPendaftaranTadika', 'namaTaskaTadikaPendaftaranTadika'];
const path = require('path');

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
        const fileNameXX = "csv-" + dateTime + ".csv";
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

