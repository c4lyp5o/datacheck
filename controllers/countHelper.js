const Tadika = require('../models/Tadika');
// const YAData = require('../models/Sekolah'); to put in the future
// const YAData = require('../models/YA'); to put in the future
const fs = require('fs');
const moment = require('moment');
const json2csv = require('json2csv').parse;
const fields = ['namaPendaftaranTadika', 'namaTaskaTadikaPendaftaranTadika', 'umurPendaftaranTadika', 'kelasPendaftaranTadika'];
const path = require('path');
const Excel = require('exceljs');
const async = require('async');

exports.kiraJumlahTadika = function(req, res) {
    Tadika.distinct('namaTaskaTadikaPendaftaranTadika', {nama: new RegExp('')}, function(err, tadikas) {
        if (err) { return res.status(500).json({ err }); }
        res.json(tadikas);
        }
    );
};

exports.filterbyDaerah = function(req, res) {
    Tadika.aggregate([
        { $match: { createdByDaerah: 'Alor Setar' } } 
      , { $project: { namaTaskaTadikaPendaftaranTadika: 1, createdByKp: 1, createdByDaerah: 1, createdByNegeri: 1 } } 
      , { $unwind: '$namaTaskaTadikaPendaftaranTadika' } 
      , { $group: { _id: { tadika: '$namaTaskaTadikaPendaftaranTadika', kp: '$createdByKp', daerah: '$createdByDaerah', negeri: '$createdByNegeri' }, count: { $sum: 1 } } }
      , { $sort: { _id: -1 } }        
    ]).exec(function(err, allResult) {
        if (err) { return res.status(500).json({ err }); }
        console.log(allResult);
        res.render('countpage', { title: 'test', allresult: allResult} )
    });
}

exports.filterEverything = function(req, res) {
    Tadika.aggregate([
        { $match: { createdByNegeri: 'Selangor' } } 
      , { $project: { namaTaskaTadikaPendaftaranTadika: 1, createdByKp: 1, createdByDaerah: 1, createdByNegeri: 1 } } /* select the tokens field as something we want to "send" to the next command in the chain */
      , { $unwind: '$namaTaskaTadikaPendaftaranTadika' } /* this converts arrays into unique documents for counting */
      , { $group: { /* execute 'grouping' */
               _id: { tadika: '$namaTaskaTadikaPendaftaranTadika', kp: '$createdByKp', daerah: '$createdByDaerah', negeri: '$createdByNegeri' } /* using the 'token' value as the _id */
            , count: { $sum: 1 } /* create a sum value */
          }
        }
    ]).exec(function(err, allResult) {
        if (err) { return res.status(500).json({ err }); }
        console.log(allResult);
        res.render('countpage', { title: 'test', allresult: allResult} )
    });
}

exports.kiraKedah = function(req, res) {
    async.parallel({
        jumlahPelajar: function(callback) {
            Tadika.countDocuments({ createdByNegeri: 'Kedah' }, callback);
        },
        listTadika: function(callback) {
            Tadika
            .find({ createdByNegeri: 'Kedah' })
            .distinct('namaTaskaTadikaPendaftaranTadika', {nama: new RegExp('')}, callback);
        },
        listAll: function(callback) {
            Tadika.aggregate([
                { $match: { createdByDaerah: 'Alor Setar' } } 
              , { $project: { namaTaskaTadikaPendaftaranTadika: 1, createdByKp: 1, createdByDaerah: 1, createdByNegeri: 1, namaPendaftaranTadika: 1 } } 
              , { $unwind: '$namaTaskaTadikaPendaftaranTadika' } 
              , { $group: { _id: { tadika: '$namaTaskaTadikaPendaftaranTadika', kp: '$createdByKp', daerah: '$createdByDaerah', negeri: '$createdByNegeri', nama: '$namaPendaftaranTadika' }, count: { $sum: 1 } } }
              , { $sort: { _id: -1 } }        
            ], callback);
        },
        // listTNuri: function(callback) {
        //   Tadika.countDocuments({ namaTaskaTadikaPendaftaranTadika: 'Tabika Kemas Taman Nuri' }, callback);
        // },
        // listTWJ: function(callback) {
        //   Tadika.countDocuments({ namaTaskaTadikaPendaftaranTadika: 'Tabika Kemas Teluk Wanjah' }, callback);
        // },
        // listTT: function(callback) {
        //   Tadika.countDocuments({ namaTaskaTadikaPendaftaranTadika: 'Tabika Kemas Tualang' }, callback);
        // },
        // listUmur4 : function(callback) {
        //   Tadika.countDocuments({ umurPendaftaranTadika: '4' }, callback);
        // },
        // listUmur5 : function(callback) {
        //   Tadika.countDocuments({ umurPendaftaranTadika: '5' }, callback);
        // },
        // listUmur6 : function(callback) {
        //   Tadika.countDocuments({ umurPendaftaranTadika: '6' }, callback);
        // },
    }
    , async function(err, results) {
        if (err) { return res.status(500).json({ err }); }
        const YearNow = moment().format('YYYY');
        const DateNow = moment().format('DD/MM/YYYY');
        const TimeNow = moment().format('HH:mm');
        alltheData = results.listAll.reverse();
        alltheTadika = results.listTadika;
        let filename = path.join(__dirname, "..", "public", "exports", "blank-template.xlsx");
        let workbook = new Excel.Workbook();
        await workbook.xlsx.readFile(filename);
        let worksheet = workbook.getWorksheet('Sheet1');
        let rowNew = worksheet.getRow(1);
        rowNew.getCell(1).value = `LAPORAN DATA SEMUA TADIKA YANG ADA BAGI TAHUN ${YearNow}.`;
        let rowNew2 = worksheet.getRow(5);
        let rowNew3 = worksheet.getRow(6);
        let rowNew4 = worksheet.getRow(7);
        let rowNew5 = worksheet.getRow(8);
        let rowNew6 = worksheet.getRow(9);
        let rowNew7 = worksheet.getRow(12);
        rowNew2.getCell(7).value = alltheData.length;
        let b = 0;
        for (let i = 7; i < alltheData.length; i++) {
            rowNew3.getCell(i).value = alltheData[b]._id.tadika;
            b++;
        }
        rowNew4.getCell(7).value = results.jumlahPelajar;
        rowNew5.getCell(7).value = results.listTadika.length;
        let c = 0;
        for (let y = 7; y < alltheData.length; y++) {
            rowNew6.getCell(y).value = alltheTadika[c];
            c++;
        rowNew7.getCell(7).value = 'Report Generated by Gi-Ret 2.0 on ' + DateNow + ' at ' + TimeNow;
        rowNew2.commit();
        rowNew3.commit();
        rowNew4.commit();
        rowNew5.commit();
        rowNew6.commit();
        rowNew7.commit();
        delete a, b, c, rowNew, rowNew2, rowNew3, rowNew4, rowNew5, rowNew6, rowNew7;
        let newfile = path.join(__dirname, "..", "public", "exports", "Kedah-Report.xlsx");
        await workbook.xlsx.writeFile(newfile);
        console.log('done filling in document');
        // res.download(newfile);
        // var alltheTadika = results.listTadika;
        // var numberofStudents = results.jumlahPelajar;
        // res.render('error', { title: 'hehe', alltheData: results.alltheData });
        }
    });
};

// exports.experiment2 = function(req, res) {
//     Tadika.aggregate([
//         {   $match: {}},
//             { $project: { namaTaskaTadikaPendaftaranTadika: 1, createdByKp: 1, createdByDaerah: 1, createdByNegeri: 1, namaPendaftaranTadika: 1 } },
//             { $unwind: '$namaTaskaTadikaPendaftaranTadika' },
//             { $group: { 
//                 _id: '$namaTaskaTadikaPendaftaranTadika', nama: { $push : '$namaPendaftaranTadika' }, daerah: { $push: "$createdByDaerah" }, negeri: { $push: "$createdByNegeri" }, count: { $sum: 1 }
//             }
//         } 
//         ]).exec(function(err, allResult) {
//         if (err) { return res.status(500).json({ err }); }
//         console.log(allResult);
//         res.render('countpage', { title: 'test', allresult: allResult} )
//     });
// }

// exports.experiment3 = function(req, res) {
//     Tadika.aggregate([
//         { $match: {}},
//         { $group: {
//             _id:  '$createdByDaerah', jumlah_murid: { $sum: 1 }, negeri: { $avg: "$createdByNegeri" }
//             }   
//         },
//         { $project: { nama_tadika: '$_id', jumlah_murid: 1 } }
//     ]).then((orders) => {
//         orders
//         .forEach((order) => {
//             console.log(order);
//         });
//     });
// }

