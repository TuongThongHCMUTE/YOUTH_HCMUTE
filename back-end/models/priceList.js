const mongoose = require('mongoose')

// Init schema
const priceListSchema = new mongoose.Schema({
    sapXep: {type: Number},
    tenChiPhi: {type: String, trim: true}, // Truy thu Đoàn phí
    donViTinh: {type: String, trim: true}, // Tháng
    donGia: {type: Number, default: 0},
    ghiChu: {type: String}, // Từ ngày 1/1/2022 đến ngày 31/12/2022
    hienThi: {type: Boolean, default: false} // Chưa đóng đoàn phí, Đã đóng đoàn phí
}, {timestamps: true})

const PriceList = mongoose.model('PriceList', priceListSchema)

module.exports = PriceList