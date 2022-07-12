const  mongoose = require('mongoose')

// Init schema
const attendanceSchema = new mongoose.Schema({
    sinhVien: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        ref: 'Student'
    },
    maSoSV: {type: String, required: true, trim: true},
    dangKyThamGia: {type: Boolean, default: false},
    thoiGianDangKy: {type: Date},
    diemDanhVao: {type: Boolean, default: false},
    thoiGianDiemDanhVao: {type: Date},
    diemDanhRa: {type: Boolean, default: false},
    thoiGianDiemDanhRa: {type: Date},
    hoanThanhHoatDong: {type: Boolean, default: false},
    ghiChu: {type: String},
    createBy: {type: String},
    updateBy: {type: String}
}, {timestamps: true})

const Attendance = mongoose.model('Attendance', attendanceSchema)

module.exports = {
    attendanceSchema,
    Attendance
}