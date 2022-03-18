const mongoose = require('mongoose')

// Init schema
const billSchema = new mongoose.Schema({
    maSoSV: {type: String, trim: true},
    namHoc: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NamHoc'
    },
    loaiPhi: [{
        thuTu: {type: Number},
        tenChiPhi: {type: String, trim: true}, // Truy thu Đoàn phí
        donViTinh: {type: String, trim: true}, // Tháng
        soLuong: {type: Number},
        donGia: {type: Number},
        thanhTien: {type: Number},
        ghiChu: {type: String} // Từ ngày 1/1/2022 đến ngày 31/12/2022
    }],
    tongTien: {type: Number},
    ngayThanhToan: {type: Date},
    trangThai: {type: Boolean, default: false}, // Chưa đóng đoàn phí, Đã đóng đoàn phí
    createBy: {type: String},
    updateBy: {type: String}
}, {timestamps: true})

const Bill = mongoose.model('Bill', billSchema)

module.exports = Bill