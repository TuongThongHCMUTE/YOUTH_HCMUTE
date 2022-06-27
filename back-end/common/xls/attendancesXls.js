const { stylesExcel, addHours } = require('../index')

const getXlsForAttendances = (attendances) => {
    const columns = [
        { header: 'STT', key: 'number', width: 6, style: stylesExcel.ALIGNMENT_MID_CENTER },
        { header: 'MSSV', key: 'maSoSV', width: 15, style: stylesExcel.ALIGNMENT_MID_CENTER },
        { header: 'Họ tên đệm', key: 'ho', width: 25, style: stylesExcel.ALIGNMENT_MID },
        { header: 'Tên', key: 'ten', width: 10, style: stylesExcel.ALIGNMENT_MID },
        { header: 'Khoa', key: 'tenDonVi', width: 30, style: stylesExcel.ALIGNMENT_MID },
        { header: 'Đăng ký', key: 'thoiGianDangKy', width: 18, style: stylesExcel.LONG_DATE_FORMAT },
        { header: 'Điểm danh vào', key: 'thoiGianDiemDanhVao', width: 18, style: stylesExcel.LONG_DATE_FORMAT },
        { header: 'Điểm danh ra', key: 'thoiGianDiemDanhRa', width: 18, style: stylesExcel.LONG_DATE_FORMAT },
        { header: 'Hoàn thành', key: 'hoanThanhHoatDong', width: 10, style: stylesExcel.ALIGNMENT_MID_CENTER }
    ]

    let stt = 1
    const data = attendances.map(attendance => {
        return {
            number: stt++,
            maSoSV: attendance.maSoSV,
            ho: attendance.sinhVien?.ho,
            ten: attendance.sinhVien?.ten,
            tenDonVi: attendance.sinhVien?.donVi?.tenDonVi,
            thoiGianDangKy: attendance.thoiGianDangKy ? addHours(7, attendance.thoiGianDangKy) : '',
            thoiGianDiemDanhVao: attendance.thoiGianDiemDanhVao ? addHours(7, attendance.thoiGianDiemDanhVao) : '',
            thoiGianDiemDanhRa: attendance.thoiGianDiemDanhRa ? addHours(7, attendance.thoiGianDiemDanhRa) : '',
            hoanThanhHoatDong: attendance.hoanThanhHoatDong ? 'X' : '',
        }
    })

    return {
        columns,
        data
    }
}

module.exports = {
    getXlsForAttendances
}