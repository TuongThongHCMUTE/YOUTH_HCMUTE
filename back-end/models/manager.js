const mongoose = require('mongoose')

// Init schema
const managerSchema = new mongoose.Schema({
    tenHienThi: {type: String, trim: true},
    diaChi: {type: String, trim: true},
    soDienThoai: {type: String, trim: true},
    donVi: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Faculty'
    }, // Khoa ĐT CLC
    chucVu: {type: String, trim: true}, // Bí thư đoàn trường
    email: {type: String, unique: [true, 'Email đã tồn tại'], trim: true, required: [true, 'Nhập email sinh viên']},
    image: {type: String},
    password: {type: String, trim: true},
    role: {type: String, trim: true}, // DOAN_KHOA, CTV_DOAN_TRUONG, DOAN_TRUONG
    trangThai: {type: Boolean, default: true}, // true, false (Đang dùng, tạm khóa)
    kichHoatTaiKhoan: {type: Boolean, default: true}, // true, false (Chưa xác thực , Đã xác thực)
    createBy: {type: String},
    updateBy: {type: String}
}, {timestamps: true})

const Manager = mongoose.model('Manager', managerSchema)

module.exports = Manager