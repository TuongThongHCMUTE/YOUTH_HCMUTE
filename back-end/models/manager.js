const mongoose = require('mongoose')

// Init schema
const managerSchema = new mongoose.Schema({
    hoVaTen: {type: String, trim: true},
    diaChi: {type: String, trim: true},
    soDienThoai: {type: String, trim: true},
    donVi: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Faculty'
    }, // Khoa ĐT CLC
    chucVu: {type: String, trim: true}, // Bí thư đoàn trường
    email: {type: String, unique: [true, 'Email đã tồn tại'], trim: true, required: [true, 'Nhập email sinh viên']},
    image: {type: String},
    googleId: {type: String, trim: true},
    role: {type: String, trim: true}, // DOAN_KHOA, CTV_DOAN_TRUONG, DOAN_TRUONG
    trangThai: {type: Boolean, default: true}, // true, false (Đang dùng, tạm khóa)
    createBy: {type: Number},
    updateBy: {type: Date}
}, {timestamps: true})

const QuanLy = mongoose.model('QuanLy', managerSchema)

module.exports = QuanLy