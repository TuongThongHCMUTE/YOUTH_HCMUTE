const mongoose = require('mongoose')

// Init schema
const schoolYearSchema = new mongoose.Schema({
    maNamHoc: {type: String, trim: true, unique: [true, 'Năm học đã tồn tại']},
    tenNamHoc: {type: String, trim: true, unique: [true, 'Năm học đã tồn tại']},
    moTa: {type: String},
    ngayBatDau: {type: Date, default: Date.Now},
    ngayKetThuc: {type: Date, default: Date.Now},
    namHocHienTai: {type: Boolean, default: false},
    hienThi: {type: Boolean, default: false}
}, {timestamps: true})

const SchoolYear = mongoose.model('SchoolYear', schoolYearSchema)

module.exports = SchoolYear