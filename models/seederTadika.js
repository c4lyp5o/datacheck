const mongoose = require("mongoose");
const TadikaData = require("../models/Tadika");

//create your array.
const newbudak = 
[   
  new TadikaData({
    namaPendaftaranTadika: "Abu Bakar",
    umurPendaftaranTadika: "2",
    kelasPendaftaranTadika: "3 delima",
    namaTaskaTadikaPendaftaranTadika: "Tabika Kemas Taman Nilam"
  }),
  new TadikaData({
    namaPendaftaranTadika: "Umar",
    umurPendaftaranTadika: "3",
    kelasPendaftaranTadika: "3 delima",
    namaTaskaTadikaPendaftaranTadika: "Tabika Kemas Taman Nilam"
  }),
  new TadikaData({
    namaPendaftaranTadika: "Usman",
    umurPendaftaranTadika: "4",
    kelasPendaftaranTadika: "3 delima",
    namaTaskaTadikaPendaftaranTadika: "Tabika Kemas Taman Nilam"
  }),
  new TadikaData({
    namaPendaftaranTadika: "Ali",
    umurPendaftaranTadika: "5",
    kelasPendaftaranTadika: "4 nilam",
    namaTaskaTadikaPendaftaranTadika: "Tabika Kemas Teluk Wanjah"
  }),
  new TadikaData({
    namaPendaftaranTadika: "Thalhah",
    umurPendaftaranTadika: "6",
    kelasPendaftaranTadika: "4 nilam",
    namaTaskaTadikaPendaftaranTadika: "Tabika Kemas Teluk Wanjah"
  }),
  new TadikaData({
    namaPendaftaranTadika: "Zubayr",
    umurPendaftaranTadika: "2",
    kelasPendaftaranTadika: "4 nilam",
    namaTaskaTadikaPendaftaranTadika: "Tabika Kemas Teluk Wanjah"
  }),
  new TadikaData({
    namaPendaftaranTadika: "Saad",
    umurPendaftaranTadika: "3",
    kelasPendaftaranTadika: "2 mutiara",
    namaTaskaTadikaPendaftaranTadika: "Tabika Kemas Taman Nuri"
  }),
  new TadikaData({
    namaPendaftaranTadika: "Said",
    umurPendaftaranTadika: "4",
    kelasPendaftaranTadika: "2 mutiara",
    namaTaskaTadikaPendaftaranTadika: "Tabika Kemas Taman Nuri"
  }),
  new TadikaData({
    namaPendaftaranTadika: "Abdur Rahman",
    umurPendaftaranTadika: "5",
    kelasPendaftaranTadika: "2 mutiara",
    namaTaskaTadikaPendaftaranTadika: "Tabika Kemas Taman Nuri"
  }),
  new TadikaData({
    namaPendaftaranTadika: "Abu Ubaidah",
    umurPendaftaranTadika: "6",
    kelasPendaftaranTadika: "4 rubi",
    namaTaskaTadikaPendaftaranTadika: "Tabika Kemas Tualang"
  }),
  new TadikaData({
    namaPendaftaranTadika: "Muaz",
    umurPendaftaranTadika: "2",
    kelasPendaftaranTadika: "4 rubi",
    namaTaskaTadikaPendaftaranTadika: "Tabika Kemas Tualang"
  }),
  new TadikaData({
    namaPendaftaranTadika: "Abu Hurairah",
    umurPendaftaranTadika: "3",
    kelasPendaftaranTadika: "4 rubi",
    namaTaskaTadikaPendaftaranTadika: "Tabika Kemas Tualang"
  }),
]

//connect mongoose
var mongoDB = 'mongodb://localhost:27017/giret';
mongoose
  .connect(mongoDB, { useNewUrlParser: true })
  .catch(err => {
    console.log(err.stack);
    process.exit(1);
  })
  .then(() => {
    console.log("connected to db in development environment");
  });

//save your data. this is an async operation
//after you make sure you seeded all the products, disconnect automatically
newbudak.map(async (p, index) => {
  await p.save((err, result) => {
    if (index === newbudak.length - 1) {
      console.log("DONE!");
      mongoose.disconnect();
    }
  });
});