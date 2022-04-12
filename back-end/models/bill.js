const mongoose = require('mongoose')

// Init schema
const billSchema = new mongoose.Schema({
    sinhVien: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    donVi: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Faculty'
    },
    maSoSV: {type: String, trim: true},
    namHoc: {type: String, trim: true},
    cacKhoanPhi: [{
        thuTu: {type: Number},
        bieuPhi: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'PriceList'
        },
        tenChiPhi: {type: String, trim: true}, // Truy thu Đoàn phí
        ngayBatDau: {type: Date},
        ngayKetThuc: {type: Date},
        donViTinh: {type: String, trim: true}, // Tháng
        soLuong: {type: Number, default: 0},
        donGia: {type: Number},
        thanhTien: {type: Number, default: 0},
        ghiChu: {type: String} // Từ tháng 1/2022 đến tháng 12/2022
    }],
    tongTien: {type: Number, default: 0},
    ngayThanhToan: {type: Date},
    trangThai: {type: Boolean, default: false}, // Chưa đóng đoàn phí, Đã đóng đoàn phí
    createBy: {type: String},
    updateBy: {type: String}
}, {timestamps: true})

const Bill = mongoose.model('Bill', billSchema)

module.exports = Bill