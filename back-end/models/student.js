const mongoose = require('mongoose')

// Init schema
const studentSchema = new mongoose.Schema({
    maSoSV: {type: String, unique: [true, 'Sinh viên đã tồn tại'], trim: true, required: [true, 'Nhập mã số sinh viên']},
    ho: {type: String, trim: true},
    ten: {type: String, trim: true},
    ngaySinh: {type: Date},
    gioiTinh: {type: String, trim: true},
    danToc: {type: String, trim: true},
    tonGiao: {type: String, trim: true},
    diaChi: {type: String, trim: true},
    doanVien: {type: Boolean, default: false},
    tinhTrang: {type: String, trim: true}, // Còn học, Thôi học
    soDienThoai: {type: String, trim: true},
    khoaHoc: {type: String, trim: true}, // 2018, 2019
    donVi: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Faculty'
    }, // Khoa ĐT CLC
    nganhHoc: {type: String, trim: true},
    lopSV: {type: String, trim: true},
    chucVu: {type: String, trim: true}, // Bí thư chi đoàn, Phó bí thư chi đoàn
    thongTinDoanVien: {
        ngayVaoDoan: {type: Date},
        noiVaoDoan: {type: String, trim: true},
        soTheDoan: {type: String, trim: true},
        trangThaiSoDoan: {type: String, trim: true}, // Chưa nộp, Đã nộp, Đã rút sổ đoàn
    },
    email: {type: String, unique: [true, 'Email đã tồn tại'], trim: true, required: [true, 'Nhập email sinh viên']},
    image: {type: String},
    googleId: {type: String},
    role: {type: String, trim: true}, // SINH_VIEN, DOAN_VIEN
    trangThai: {type: Boolean, default: true}, // true, false (Đang dùng, tạm khóa),
    createBy: {type: String},
    updateBy: {type: String}
}, {timestamps: true})

// Vital property
studentSchema.virtual('hoVaTen').get(function() {
    return this.ho + ' ' + this.ten
})

const Student = mongoose.model('Student', studentSchema)

module.exports = Student