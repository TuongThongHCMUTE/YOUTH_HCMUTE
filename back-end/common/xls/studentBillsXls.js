const { stylesExcel, addHours } = require('../index')

const getXlsForStudentBills = (studentBills) => {
    const columns = [
        { header: 'STT', key: 'number', width: 6, style: stylesExcel.ALIGNMENT_MID_CENTER },
        { header: 'MSSV', key: 'maSoSV', width: 15, style: stylesExcel.ALIGNMENT_MID_CENTER },
        { header: 'Họ tên đệm', key: 'ho', width: 25, style: stylesExcel.ALIGNMENT_MID },
        { header: 'Tên', key: 'ten', width: 10, style: stylesExcel.ALIGNMENT_MID },
        { header: 'Đoàn viên', key: 'doanVien', width: 10, style: stylesExcel.ALIGNMENT_MID_CENTER },
        { header: 'Tình trạng', key: 'tinhTrang', width: 15, style: stylesExcel.ALIGNMENT_MID_CENTER },
        { header: 'Khoa', key: 'tenDonVi', width: 30, style: stylesExcel.ALIGNMENT_MID },
        { header: 'Chi đoàn', key: 'lopSV', width: 15, style: stylesExcel.ALIGNMENT_MID },
        { header: 'Trạng thái', key: 'trangThai', width: 20, style: stylesExcel.ALIGNMENT_MID_CENTER },
        { header: 'Tổng tiền', key: 'tongTien', width: 15, style: stylesExcel.ALIGNMENT_MID },
        { header: 'Ngày thanh toán', key: 'ngayThanhToan', width: 25, style: stylesExcel.LONG_DATE_FORMAT }

    ]

    let stt = 1
    const data = studentBills.map(studentbill => {
        return {
            number: stt++,
            maSoSV: studentbill.maSoSV,
            ho: studentbill.ho,
            ten: studentbill.ten,
            doanVien: studentbill.doanVien === true ? 1 : 0,
            tinhTrang: studentbill.tinhTrang,
            tenDonVi: studentbill.donVi?.tenDonVi,
            lopSV: studentbill.lopSV?.tenLop,
            trangThai: studentbill.bill.trangThai,
            tongTien: studentbill.bill.tongTien,
            ngayThanhToan: studentbill.bill.ngayThanhToan ? addHours(7, studentbill.bill.ngayThanhToan) : ''
        }
    })

    return {
        columns,
        data
    }
}

module.exports = {
    getXlsForStudentBills
}