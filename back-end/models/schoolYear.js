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
    createBy: {type: Number},
    updateBy: {type: Date}
}, {timestamps: true})

const NamHoc = mongoose.model('NamHoc', schoolYearSchema)

module.exports = NamHoc