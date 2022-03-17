const mongoose = require('mongoose')

// Init schema
const priceListSchema = new mongoose.Schema({
    thuTu: {type: Number},
    tenChiPhi: {type: String, trim: true}, // Truy thu Đoàn phí
    donViTinh: {type: String, trim: true}, // Tháng
    donGia: {type: Number, default: 0},
    ghiChu: {type: String}, // Từ ngày 1/1/2022 đến ngày 31/12/2022
    hienThi: {type: Boolean, default: false}, // Chưa đóng đoàn phí, Đã đóng đoàn phí
    createBy: {type: Number},
    updateBy: {type: Date}
}, {timestamps: true})

const LoaiPhi = mongoose.model('LoaiPhi', priceListSchema)

module.exports = LoaiPhi