const mongoose = require('mongoose')

// Init schema
const groupBookSchema = new mongoose.Schema({
    sinhVien: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        required: [true, 'Nhập sinh viên '],
        ref: 'SinhVien'
    },
    maSV: {type: String, trim: true},
    viTri: {type: String, trim: true},
    moTa: {type: String},
    pheSo: [{
        ngayPheSo: {type: Date, default: Date.Now},
        nguoiPheSo: {type: String, trim: true},
        chucVuNguoiPhe: {type: String, trim: true},
        maNamHoc: {type: String, trim: true},
        noiDung: {type: String},
        hienThi: {type: Boolean, default: false},
        trangThaiDuyet: {type: Boolean, default: false}, // Chưa duyệt, Đã duyệt
        nguoiDuyet: {type: String, trim: true},
        chucVuNguoiDuyet: {type: String, trim: true},
        noiDungDuyet: {type: String},
        createBy: {type: Number},
    }],
    trangThaiSo: {type: Boolean, default: true}, // Chưa nộp, đã nộp (Giống trạng thái bên sinh viên)
    createBy: {type: Number},
    updateBy: {type: Date}
}, {timestamps: true})

const SoDoan = mongoose.model('SoDoan', groupBookSchema)

module.exports = SoDoan