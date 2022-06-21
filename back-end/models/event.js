const mongoose = require('mongoose')
const { attendanceSchema } = require('./attendance')

// Init schema
const eventSchema = new mongoose.Schema({
    tenHoatDong: {type: String, required: [true, 'Nhập tên hoạt động']},
    moTa: {type: String},
    thoiGianDangKy: {
        thoiGianBatDau: {type: Date},
        thoiGianKetThuc: {type: Date}
    },
    thoiGianToChuc: {
        thoiGianBatDau: {type: Date},
        thoiGianKetThuc: {type: Date}
    },
    diaDiem: {type: String},
    soLuongSinhVien: {type: Number, default: 0},
    quyMoToChuc: {type: String}, // Cấp trường, Cấp khoa
    quenLoiThamGia: {type: String}, // DIEM_REN_LUYEN, DIEM_CTXH
    diemCong: {type: Number, default: 0}, // 2, 3, 5
    anhBia: {type: String}, // Link of picture
    maNamHoc: {type: String},
    hocKy: {type: String},
    tieuChi: [{
        maTieuChi: {type: String},
        tenTieuChi: {type: String}
    }],
    tags: [{
        tag: { type: String },
        name: { type: String }
    }],
    linkTruyenThong: {type: String},
    soLuongSinhVienDangKy: {type: Number, default: 0},
    soLuongSinhVienThamGia: {type: Number, default: 0},
    sinhViens: [{ type: attendanceSchema }],
    dieuKienHoanThanhs: {type: [String], default: ['diemDanhVao']},
    daDuyet: {type: Boolean, default: false},
    hienThi: {type: Boolean, default: false},
    ghiChu: {type: String},
    createBy: {type: String},
    updateBy: {type: String}
}, {timestamps: true})

eventSchema.index({
    tenHoatDong: 'text',
    moTa: 'text'
})

const Event = mongoose.model('Event', eventSchema)

module.exports = Event