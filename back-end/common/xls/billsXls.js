const { stylesExcel, addHours } = require('../index')

const getXlsForBills = (bills) => {
    const columns = [
        { header: 'STT', key: 'number', width: 6, style: stylesExcel.ALIGNMENT_MID_CENTER },
        { header: 'Mã số sinh viên', key: 'maSoSV', width: 15, style: stylesExcel.ALIGNMENT_MID_CENTER },
        { header: 'Họ và tên', key: 'hoVaTen', width: 30, style: stylesExcel.ALIGNMENT_MID },
        { header: 'Đơn vị', key: 'tenDonVi', width: 30, style: stylesExcel.ALIGNMENT_MID },
        { header: 'Nộp sổ đoàn', key: 'nopSoDoan', width: 12, style: stylesExcel.ALIGNMENT_MID_CENTER},
        { header: 'Năm học', key: 'namHoc', width: 12, style: stylesExcel.ALIGNMENT_MID_CENTER},
        { header: 'Trạng thái', key: 'trangThai', width: 20, style: stylesExcel.ALIGNMENT_MID_CENTER },
        { header: 'Tổng tiền', key: 'tongTien', width: 15, style: stylesExcel.ALIGNMENT_MID },
        { header: 'Ngày thanh toán', key: 'ngayThanhToan', width: 25, style: stylesExcel.LONG_DATE_FORMAT }
    ]

    let stt = 1
    const data = bills.map(bill => {
        return {
            number: stt++,
            maSoSV: bill.maSoSV,
            hoVaTen: bill.sinhVien.ho + ' ' + bill.sinhVien.ten,
            tenDonVi: bill.donVi?.tenDonVi,
            nopSoDoan: bill.cacKhoanPhi?.find(priceList => priceList.tenChiPhi === 'Sổ đoàn viên') ? 'X' : '',
            namHoc: bill.namHoc,
            trangThai: bill.trangThai ? 'Đã thanh toán' : 'Chưa thanh toán',
            tongTien: bill.tongTien,
            ngayThanhToan: bill.ngayThanhToan ? addHours(7, bill.ngayThanhToan) : ''
        }
    })

    return {
        columns,
        data
    }
}

module.exports = {
    getXlsForBills
}