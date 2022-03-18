const mongoose = require('mongoose')

// Init schema
const schoolYearSchema = new mongoose.Schema({
    maNamHoc: {type: String, trim: true, unique: [true, 'Năm học đã tồn tại']},
    tenNamHoc: {type: String, trim: true, unique: [true, 'Năm học đã tồn tại']},
    chuDeNamHoc: {type: String},
    moTa: {type: String},
    ngayBatDau: {type: Date, default: Date.Now},
    ngayKetThuc: {type: Date, default: Date.Now},
    namHocHienTai: {type: Boolean, default: false},
    hienThi: {type: Boolean, default: false},
    hocKy: [{
        maHocKy: {type: String},
        tenHocKy: {type: String},
        ngayKetThuc: {type: Date},
        ngayBatDau: {type: Date}
    }],
    createBy: {type: String},
    updateBy: {type: String}
}, {timestamps: true})

const SchoolYear = mongoose.model('SchoolYear', schoolYearSchema)

module.exports = SchoolYear