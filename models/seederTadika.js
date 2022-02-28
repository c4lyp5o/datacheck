const mongoose = require("mongoose");
const TadikaData = require("../models/Tadika");

//create your array.
const newbudak = 
[   
  new TadikaData({
    createdByNegeri: "Kedah",
    createdByDaerah: "Kuala Muda",
    createdByKp: "KP Taman Segar",
    namaPendaftaranTadika: "Fauzan bin Arif",
    umurPendaftaranTadika: "4",
    kelasPendaftaranTadika: "1 delima",
    namaTaskaTadikaPendaftaranTadika: "Tabika Kemas Taman Segar"
  }),
  new TadikaData({
    createdByNegeri: "Kedah",
    createdByDaerah: "Kuala Muda",
    createdByKp: "KP Taman Segar",
    namaPendaftaranTadika: "Ariffin bin Samsudin",
    umurPendaftaranTadika: "5",
    kelasPendaftaranTadika: "2 nilam",
    namaTaskaTadikaPendaftaranTadika: "Tabika Kemas Taman Segar"
  }),
  new TadikaData({
    createdByNegeri: "Kedah",
    createdByDaerah: "Yan",
    createdByKp: "KP Sungai Limau",
    namaPendaftaranTadika: "Syed Farhan bin Syed Aqil",
    umurPendaftaranTadika: "6",
    kelasPendaftaranTadika: "3 intan",
    namaTaskaTadikaPendaftaranTadika: "Tabika Kemas Simpang Limau"
  }),
  new TadikaData({
    createdByNegeri: "Kedah",
    createdByDaerah: "Sik",
    createdByKp: "KP Gulau",
    namaPendaftaranTadika: "Fatimah bin Muhammad",
    umurPendaftaranTadika: "4",
    kelasPendaftaranTadika: "1 delima",
    namaTaskaTadikaPendaftaranTadika: "Tabika Kemas Gulau"
  }),
  new TadikaData({
    createdByNegeri: "Perlis",
    createdByDaerah: "Beseri",
    createdByKp: "KP Beseri",
    namaPendaftaranTadika: "Ibrahim bin Suhaim",
    umurPendaftaranTadika: "4",
    kelasPendaftaranTadika: "1 berani",
    namaTaskaTadikaPendaftaranTadika: "Tabika Kemas Brejak"
  }),
  new TadikaData({
    createdByNegeri: "Perlis",
    createdByDaerah: "Beseri",
    createdByKp: "KP Beseri",
    namaPendaftaranTadika: "Mohd Ali bin Zubir",
    umurPendaftaranTadika: "5",
    kelasPendaftaranTadika: "2 adil",
    namaTaskaTadikaPendaftaranTadika: "Tabika Kemas Brejak"
  }),
  new TadikaData({
    createdByNegeri: "Perlis",
    createdByDaerah: "Kuala Perlis",
    createdByKp: "KP Kuala Perlis",
    namaPendaftaranTadika: "Nabilah binti Amran",
    umurPendaftaranTadika: "6",
    kelasPendaftaranTadika: "3 cerdik",
    namaTaskaTadikaPendaftaranTadika: "Tabika Kemas Kuala Perlis"
  }),
  new TadikaData({
    createdByNegeri: "Perlis",
    createdByDaerah: "Kuala Perlis",
    createdByKp: "KP Kuala Perlis",
    namaPendaftaranTadika: "Nur Fadzilah binti Zain",
    umurPendaftaranTadika: "4",
    kelasPendaftaranTadika: "1 bersih",
    namaTaskaTadikaPendaftaranTadika: "Tabika Kemas Kuala Perlis"
  }),
  new TadikaData({
    createdByNegeri: "Selangor",
    createdByDaerah: "Tanjong Karang",
    createdByKp: "KP Sungai Buloh",
    namaPendaftaranTadika: "Syafiqah binti Mohd Arif",
    umurPendaftaranTadika: "4",
    kelasPendaftaranTadika: "1 siddiq",
    namaTaskaTadikaPendaftaranTadika: "Tabika Kemas Taman Baru"
  }),
  new TadikaData({
    createdByNegeri: "Selangor",
    createdByDaerah: "Tanjung Karang",
    createdByKp: "KP Sungai Buloh",
    namaPendaftaranTadika: "Syahidah binti Mansor",
    umurPendaftaranTadika: "5",
    kelasPendaftaranTadika: "2 fathanah",
    namaTaskaTadikaPendaftaranTadika: "Tabika Kemas Taman Baru"
  }),
  new TadikaData({
    createdByNegeri: "Selangor",
    createdByDaerah: "Melawati",
    createdByKp: "KP Melawati",
    namaPendaftaranTadika: "Zulfadli bin Ahmad",
    umurPendaftaranTadika: "6",
    kelasPendaftaranTadika: "3 amanah",
    namaTaskaTadikaPendaftaranTadika: "Tabika Kemas Melawati"
  }),
  new TadikaData({
    createdByNegeri: "Selangor",
    createdByDaerah: "Melawati",
    createdByKp: "KP Melawati",
    namaPendaftaranTadika: "Rafika Dewi binti Abdul Razak",
    umurPendaftaranTadika: "4",
    kelasPendaftaranTadika: "1 tabligh",
    namaTaskaTadikaPendaftaranTadika: "Tabika Kemas Melawati"
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