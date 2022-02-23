const mongoose = require('mongoose');

const TadikaSchema = mongoose.Schema({
    // negeri, daerah, kp is associated with each person
    createdByNegeri: {
        type: String,
        //required: true
    },
    createdByDaerah: {
        type: String,
        //required: true
    },
    createdByKp: {
        type: String,
        //required: true
    },
    // --------------------------------------------------
    namaPendaftaranTadika: {
        type: String,
        //required: [true, 'Please provide nama'],
        //trim: true
    },
    umurPendaftaranTadika: {
        type: String,
        //required: [true, 'Please provide umur'],
    },
    kelasPendaftaranTadika: {
        type: String,
        //required: [true, 'Please provide kelas'],
        //trim: true
    },
    namaTaskaTadikaPendaftaranTadika: {
        type: String,
        //required: [true, 'Please provide nama taska/tadika'],
        //trim: true
    }
});

module.exports = mongoose.model('Tadika', TadikaSchema);