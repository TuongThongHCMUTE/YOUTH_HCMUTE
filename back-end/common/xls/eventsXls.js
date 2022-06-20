const { stylesExcel, addHours } = require('../index')

const getXlsForEvents = (events) => {
    const columns = [
        { header: 'STT', key: 'number', width: 6, style: stylesExcel.ALIGNMENT_MID_CENTER },
        { header: 'Tên hoạt động', key: 'tenHoatDong', width: 60, style: stylesExcel.ALIGNMENT_MID },
        { header: 'Mô tả', key: 'moTa', width: 50, style: stylesExcel.ALIGNMENT_MID },
        { header: 'Bắt đầu đăng ký', key: 'batDauDangKy', width: 16, style: stylesExcel.LONG_DATE_FORMAT },
        { header: 'Kết thúc đăng ký', key: 'ketThucDangKy', width: 16, style: stylesExcel.LONG_DATE_FORMAT },
        { header: 'Bắt đầu tổ chức', key: 'batDauToChuc', width: 16, style: stylesExcel.LONG_DATE_FORMAT },
        { header: 'Kết thúc tổ chức', key: 'ketThucToChuc', width: 16, style: stylesExcel.LONG_DATE_FORMAT },
        { header: 'Địa điểm tổ chức', key: 'diaDiem', width: 30, style: stylesExcel.ALIGNMENT_MID },
        { header: 'Số lượng sinh viên', key: 'soLuongSinhVien', width: 15, style: stylesExcel.ALIGNMENT_MID },
        { header: 'Quy mô tổ chức', key: 'quyMoToChuc', width: 15, style: stylesExcel.ALIGNMENT_MID },
        { header: 'Quyền lợi tham gia', key: 'quenLoiThamGia', width: 15, style: stylesExcel.ALIGNMENT_MID },
        { header: 'Điểm cộng', key: 'diemCong', width: 10, style: stylesExcel.ALIGNMENT_MID },
        { header: 'Link truyền thông', key: 'linkTruyenThong', width: 15, style: stylesExcel.ALIGNMENT_MID },
        { header: 'Số lượng sinh viên đăng ký', key: 'soLuongSinhVienDangKy', width: 10, style: stylesExcel.ALIGNMENT_MID },
        { header: 'Số lượng sinh viên tham gia', key: 'soLuongSinhVienThamGia', width: 10, style: stylesExcel.ALIGNMENT_MID },
        { header: 'Trạng thái duyệt', key: 'daDuyet', width: 15, style: stylesExcel.ALIGNMENT_MID_CENTER },
        { header: 'Hiển thị', key: 'hienThi', width: 15, style: stylesExcel.ALIGNMENT_MID_CENTER }

    ]

    let stt = 1
    const data = events.map(event => {
        return {
            number: stt++,
            tenHoatDong: event.tenHoatDong,
            moTa: event.moTa,
            batDauDangKy: event.thoiGianDangKy?.thoiGianBatDau ? addHours(7, event.thoiGianDangKy?.thoiGianBatDau) : '',
            ketThucDangKy: event.thoiGianDangKy?.thoiGianKetThuc ? addHours(7, event.thoiGianDangKy?.thoiGianKetThuc) : '',
            batDauToChuc: event.thoiGianToChuc?.thoiGianBatDau ? addHours(7, event.thoiGianToChuc?.thoiGianBatDau) : '',
            ketThucToChuc: event.thoiGianToChuc?.thoiGianKetThuc ? addHours(7, event.thoiGianToChuc?.thoiGianKetThuc) : '',
            soLuongSinhVien: event.soLuongSinhVien,
            diaDiem: event.diaDiem,
            quyMoToChuc: event.quyMoToChuc,
            quenLoiThamGia: event.quenLoiThamGia,
            diemCong: event.diemCong,
            linkTruyenThong: event.linkTruyenThong,
            soLuongSinhVienDangKy: event.soLuongSinhVienDangKy,
            soLuongSinhVienThamGia: event.soLuongSinhVienThamGia,
            daDuyet: event.daDuyet == true ? 'Đã duyệt' : 'Chưa duyệt',
            hienThi: event.hienThi == true ? 'Hiển thị' : 'Ẩn',
        }
    })

    return {
        columns,
        data
    }
}

module.exports = {
    getXlsForEvents
}