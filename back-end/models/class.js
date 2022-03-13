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
    quanLy: {
        chucVu: {type: String},
        maSoSV: {type: String}
    },
    hienThi: {type: Boolean, default: true}
}, {timestamps: true})

const Class = mongoose.model('Class', classSchema)

module.exports = Class