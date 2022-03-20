const mongoose = require('mongoose')

// Init schema
const billSchema = new mongoose.Schema({
    maSoSV: {type: String, trim: true},
    namHoc: {type: String, trim: true},
    phiCanDong: [{
        thuTu: {type: Number},
        bieuPhi: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'PriceList'
        },
        tenChiPhi: {type: String, trim: true}, // Truy thu Đoàn phí
        thoiGian: {type: String, trim: true}, // 09/2021-08/2022 
        donViTinh: {type: String, trim: true}, // Tháng
        donGia: {type: Number},
        soLuong: {type: Number},
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