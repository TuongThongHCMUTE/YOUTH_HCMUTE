const  mongoose = require('mongoose')

// Init schema
const eventSchema = new mongoose.Schema({
    tenChuongTrinh: {type: String, required: [true, 'Nhập tên chương trình']},
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
    soLuongSinhVien: {type: Number},
    quyMoToChuc: {type: String},
    quenLoiThamGia: {type: String}, // DIEM_REN_LUYEN, DIEM_CTXH
    diemCong: {type: Number}, // 2, 3, 5
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
    sinhVienThamGia: [{
        sinhVien: {
            type: mongoose.Schema.Types.ObjectId,
            trim: true,
            ref: 'Student'
        },
        maSoSV: {type: String, required: true, trim: true},
        thoiGianDangKy: {type: Date},
        diemDanh: {type: Boolean},
        thoiGianDiemDanh: {type: Date},
        ghiChu: {type: String},
    }],
    daDuyet: {type: Boolean, default: false},
    hienThi: {type: Boolean, default: false},
    ghiChu: {type: String},
    createBy: {type: String},
    updateBy: {type: String}
}, {timestamps: true})

eventSchema.index({
    tenChuongTrinh: 'text',
    moTa: 'text'
})

const Event = mongoose.model('Event', eventSchema)

module.exports = Event