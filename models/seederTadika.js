const mongoose = require("mongoose");
const TadikaData = require("../models/Tadika");

//create your array.
const newbudak = 
[   
  new TadikaData({
    namaPendaftaranTadika: "Maulana",
    umurPendaftaranTadika: "2",
    kelasPendaftaranTadika: "3 delima",
    namaTaskaTadikaPendaftaranTadika: "Tabika Kemas Taman Nilam"
  }),
  new TadikaData({
    namaPendaftaranTadika: "Satria",
    umurPendaftaranTadika: "3",
    kelasPendaftaranTadika: "4 nilam",
    namaTaskaTadikaPendaftaranTadika: "Tabika Kemas Taman Nuri"
  }),
  new TadikaData({
    namaPendaftaranTadika: "Qutaibah",
    umurPendaftaranTadika: "4",
    kelasPendaftaranTadika: "5 intan",
    namaTaskaTadikaPendaftaranTadika: "Tabika Kemas Teluk Wanjah"
  }),
  new TadikaData({
    namaPendaftaranTadika: "Rizal",
    umurPendaftaranTadika: "5",
    kelasPendaftaranTadika: "3 delima",
    namaTaskaTadikaPendaftaranTadika: "Tabika Kemas Tualang"
  }),
  new TadikaData({
    namaPendaftaranTadika: "Iskandar",
    umurPendaftaranTadika: "6",
    kelasPendaftaranTadika: "4 nilam",
    namaTaskaTadikaPendaftaranTadika: "Tabika Kemas Taman Nilam"
  }),
  new TadikaData({
    namaPendaftaranTadika: "Heriyanto",
    umurPendaftaranTadika: "2",
    kelasPendaftaranTadika: "5 intan",
    namaTaskaTadikaPendaftaranTadika: "Tabika Kemas Taman Nuri"
  }),
  new TadikaData({
    namaPendaftaranTadika: "Budi",
    umurPendaftaranTadika: "3",
    kelasPendaftaranTadika: "3 delima",
    namaTaskaTadikaPendaftaranTadika: "Tabika Kemas Teluk Wanjah"
  }),
  new TadikaData({
    namaPendaftaranTadika: "Aishah",
    umurPendaftaranTadika: "4",
    kelasPendaftaranTadika: "4 nilam",
    namaTaskaTadikaPendaftaranTadika: "Tabika Kemas Tualang"
  }),
  new TadikaData({
    namaPendaftaranTadika: "Luthfiyya",
    umurPendaftaranTadika: "5",
    kelasPendaftaranTadika: "5 intan",
    namaTaskaTadikaPendaftaranTadika: "Tabika Kemas Taman Nilam"
  }),
  new TadikaData({
    namaPendaftaranTadika: "Madihah",
    umurPendaftaranTadika: "6",
    kelasPendaftaranTadika: "3 delima",
    namaTaskaTadikaPendaftaranTadika: "Tabika Kemas Taman Nuri"
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