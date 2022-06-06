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
    soLuongSinhVien: {type: Number, default: 0},
    quyMoToChuc: {type: String}, // Cấp trường, Cấp khoa
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
    soLuongSinhVienDangKy: {type: Number, default: 0},
    soLuongSinhVienThamGia: {type: Number, default: 0},
    sinhVienThamGia: [{
        sinhVien: {
            type: mongoose.Schema.Types.ObjectId,
            trim: true,
            ref: 'Student'
        },
        maSoSV: {type: String, required: true, trim: true},
        dangKyThamGia: {type: Boolean, default: false},
        thoiGianDangKy: {type: Date},
        diemDanhVao: {type: Boolean, default: false},
        thoiGianDiemDanhVao: {type: Date},
        diemDanhRa: {type: Boolean, default: false},
        thoiGianDiemDanhRa: {type: Date},
        ghiChu: {type: String},
    }],
    daDuyet: {type: Boolean, default: false},
    hienThi: {type: Boolean, default: false},
    ghiChu: {type: String},
    createBy: {type: String},
    updateBy: {type: String}
}, {timestamps: true})

// eventSchema.index({
//     tenChuongTrinh: 'text',
//     moTa: 'text'
// })

// const events = await Event.find(
//                         { $text: { $search : searchString } },  
//                         { score : { $meta: "textScore" } })
//                         .sort({ score: { $meta : 'textScore' }})

const Event = mongoose.model('Event', eventSchema)

module.exports = Event