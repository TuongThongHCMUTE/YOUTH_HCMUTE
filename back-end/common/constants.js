exports.mappingFields = {
    tenLop: 'Tên lớp',
    email: 'Email',
    sinhVien: 'Sinh viên',
    maSoSV: 'Mã số sinh viên',
    maNamHoc: 'Mã năm học',
    namHoc: 'Năm học',
    tenNamHoc: 'Tên năm học',
    noiDung: 'Nội dung'
}


exports.stylesExcel = {
    ALIGNMENT_MID: {alignment: { vertical: 'middle'}},
    ALIGNMENT_MID_CENTER: {alignment: { vertical: 'middle', horizontal: 'center' }},
    SHORT_DATE_FORMAT: {alignment: { vertical: 'middle', horizontal: 'center' }, numFmt: 'dd/mm/yyyy'},
    LONG_DATE_FORMAT: {alignment: { vertical: 'middle', horizontal: 'center'}, numFmt: 'dd/mm/yyyy hh:mm'},
}

exports.populateFields = {
    attendance: {
        path: 'sinhViens.sinhVien',
        select: 'maSoSV ho ten',
        populate: {
            path:  'donVi',
            select: 'tenDonVi'
        }
    }
}

exports.defaultBill = {
    "tongTien": 50000,
    // Sổ đoàn viên
    "623a1299019af19b601f4084": {
        "soLuong": 1,
        "thanhTien": 0
    },
    // Đoàn phí
    "623a12e8019af19b601f4089": {
        "ngayBatDau": "2021-09-30T17:00:00.000+00:00",
        "ngayKetThuc": "2022-09-30T17:00:00.000+00:00",
        "soLuong": 12,
        "thanhTien": 24000
    },
    // Truy thu Đoàn phí
    "623a1341019af19b601f4092": {
        "soLuong": 0,
        "thanhTien": 0
    },
    // Kinh phí đóng góp công trình thanh niên
    "623a136f019af19b601f4094": {
        "soLuong": 12,
        "thanhTien": 24000
    },
    // Kinh phí làm thẻ Hội viên hội sinh viên Việt Nam
    "623a13b8019af19b601f4096": {
        "soLuong": 1,
        "thanhTien": 2000
    }
}