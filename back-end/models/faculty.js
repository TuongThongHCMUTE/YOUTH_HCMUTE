const  mongoose = require('mongoose')

// Init schema
const facultySchema = new mongoose.Schema({
    tenDonVi: {type: String, trim: true, required: [true, 'Nhập tên đơn vị']},
    moTa: {type: String},
    soDienThoai: {type: String, trim: true},
    email: {type: String, unique: [true, 'Email đã tồn tại'], trim: true, required: [true, 'Nhập email quản lý']},
    image: {type: String},
    loaiDonVi: {type: String, trim: true}, // DOAN_KHOA, DOAN_TRUONG, PHONG_BAN
    hienThi: {type: Boolean, default: false},
    createBy: {type: Number},
    updateBy: {type: Date}
}, {timestamps: true})

const DonVi = mongoose.model('DonVi', facultySchema)

module.exports = DonVi