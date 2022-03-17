const mongoose = require('mongoose')

// Init schema
const classSchema = new mongoose.Schema({
    tenLop: {type: String, trim: true, unique: [true, 'Lớp đã tồn tại'], required: [true, 'Nhập tên lớp']},
    nganhHoc: {type: String, trim: true},
    moTa: {type: String},
    donVi: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DonVi'
    },
    quanLy: [{
        chucVu: {type: String},
        sinhVienId: {type: String}, // Id sinh viên
        hoTen: {type: String}
    }],
    hienThi: {type: Boolean, default: true},
    createBy: {type: Number},
    updateBy: {type: Date}
}, {timestamps: true})

const Lop = mongoose.model('Lop', classSchema)

module.exports = Lop