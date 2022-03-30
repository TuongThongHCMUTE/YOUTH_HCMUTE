const mongoose = require('mongoose')

// Init schema
const groupBookSchema = new mongoose.Schema({
    sinhVien: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        unique: [true, 'Sinh viên đã tồn tại'],
        ref: 'Student'
    },
    maSoSV: {type: String, unique: [true, 'Sinh viên đã tồn tại'], required: true, trim: true},
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
    trangThaiSoDoan: {type: String, trim: true}, // Chưa nộp, Đã nộp, Đã rút sổ đoàn (Giống trạng thái bên sinh viên)
    ngayNopSo: {type: Date, default: Date.Now},
    ngayRutSo: {type: Date},
    createBy: {type: String},
    updateBy: {type: String}
}, {timestamps: true})

const GroupBook = mongoose.model('GroupBook', groupBookSchema)

module.exports = GroupBook