const Tadika = require('../models/Tadika');
// const YAData = require('../models/Sekolah'); to put in the future
// const YAData = require('../models/YA'); to put in the future
const fs = require('fs');
const moment = require('moment');
const json2csv = require('json2csv').parse;
const fields = ['namaPendaftaranTadika', 'namaTaskaTadikaPendaftaranTadika', 'umurPendaftaranTadika', 'kelasPendaftaranTadika'];
const path = require('path');
const Excel = require('exceljs');

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

