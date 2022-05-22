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
        maNamHoc: {type: String, uniqued: true, trim: true},
        ngayPheSo: {type: Date, default: Date.Now},
        nguoiPhe: {
            hoTen: {type: String, trim: true},
            email: {type: String, trim: true},
            chucVu: {type: String, trim: true},
        },
        noiDungPhe: {type: String},
        nguoiDuyet: {
            hoTen: {type: String, trim: true},
            email: {type: String, trim: true},
            chucVu: {type: String, trim: true},
        },
        noiDungDuyet: {type: String},
        trangThai: {type: Boolean, default: false}, // Chưa duyệt, Đã duyệt
        createBy: {type: String},
        updateBy: {type: String},
    }],
    trangThaiSoDoan: {type: String, trim: true}, // Chưa nộp, Đã nộp, Đã rút sổ đoàn (Giống trạng thái bên sinh viên)
    ngayNopSo: {type: Date, default: Date.Now},
    ngayRutSo: {type: Date},
    createBy: {type: String},
    updateBy: {type: String}
}, {timestamps: true})

const GroupBook = mongoose.model('GroupBook', groupBookSchema)

module.exports = GroupBook