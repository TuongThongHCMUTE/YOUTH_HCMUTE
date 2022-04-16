const mongoose = require('mongoose')

// Init schema
const classSchema = new mongoose.Schema({
    tenLop: {type: String, trim: true, unique: [true, 'Lớp đã tồn tại'], required: [true, 'Nhập tên lớp']},
    nganhHoc: {type: String, trim: true},
    moTa: {type: String},
    donVi: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Faculty'
    },
    quanLy: [{
        chucVu: {type: String},
        sinhVien: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student'
        }, // Id sinh viên
        maSoSV: {type: String, trim: true},
        hoTen: {type: String}
    }],
    hienThi: {type: Boolean, default: true},
    createBy: {type: String},
    updateBy: {type: String}
}, {timestamps: true})

const Class = mongoose.model('Class', classSchema)

module.exports = Class