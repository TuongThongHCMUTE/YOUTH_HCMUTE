const mongoose = require('mongoose')

// Init schema
const groupBookSchema = new mongoose.Schema({
    maSoSV: {type: String, trim: true, required: [true, 'Nhập sinh viên ']},
    viTri: {type: String, trim: true},
    moTa: {type: String},
    pheSo: {
        ngayPheSo: {type: Date, default: Date.Now},
        nguoiPheSo: {type: String, trim: true},
        maNamHoc: {type: String, trim: true},
        noiDung: {type: String},
        hienThi: {type: Boolean, default: false},
        trangThaiDuyet: {type: Boolean, default: false}, // Chưa duyệt, Đã duyệt
        nguoiDuyet: {type: String, trim: true},
        chucVuNguoiDuyet: {type: String, trim: true},
        noiDungDuyet: {type: String}
    },
    trangThaiSo: {type: Boolean, default: true}
}, {timestamps: true})

const GroupBook = mongoose.model('GroupBook', groupBookSchema)

module.exports = GroupBook