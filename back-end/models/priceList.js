const mongoose = require('mongoose')

// Init schema
const priceListSchema = new mongoose.Schema({
    thuTu: {type: Number},
    tenChiPhi: {type: String, trim: true}, // Truy thu Đoàn phí
    donViTinh: {type: String, trim: true}, // Tháng
    donGia: {type: Number, default: 0},
    hienThi: {type: Boolean, default: false}, // Chưa đóng đoàn phí, Đã đóng đoàn phí
    thongTinMacDinh: {
        ngayBatDau: {type: Date},
        ngayKetThuc: {type: Date},
        soLuong: {type: Number, default: 0},
        thanhTien: {type: Number, default: 0},
    },
    ghiChu: {type: String}, // Từ tháng 1/2022 tháng 12/2022
    createBy: {type: String},
    updateBy: {type: String}
}, {timestamps: true})

const PriceList = mongoose.model('PriceList', priceListSchema)

module.exports = PriceList