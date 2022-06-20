const { stylesExcel, addHours } = require('../index')

const getXlsForStudents = (students) => {
    const columns = [
        { header: 'STT', key: 'number', width: 6, style: stylesExcel.ALIGNMENT_MID_CENTER },
        { header: 'MSSV', key: 'maSoSV', width: 15, style: stylesExcel.ALIGNMENT_MID_CENTER },
        { header: 'Họ tên đệm', key: 'ho', width: 25, style: stylesExcel.ALIGNMENT_MID },
        { header: 'Tên', key: 'ten', width: 10, style: stylesExcel.ALIGNMENT_MID },
        { header: 'Ngày sinh', key: 'ngaySinh', width: 16, style: stylesExcel.SHORT_DATE_FORMAT },
        { header: 'Giới tính', key: 'gioiTinh', width: 10, style: stylesExcel.ALIGNMENT_MID },
        { header: 'Dân tộc', key: 'danToc', width: 15, style: stylesExcel.ALIGNMENT_MID },
        { header: 'Tôn giáo', key: 'tonGiao', width: 16, style: stylesExcel.ALIGNMENT_MID },
        { header: 'Địa chỉ', key: 'diaChi', width: 30, style: stylesExcel.ALIGNMENT_MID },
        { header: 'Đoàn viên', key: 'doanVien', width: 10, style: stylesExcel.ALIGNMENT_MID_CENTER },
        { header: 'Tình trạng', key: 'tinhTrang', width: 15, style: stylesExcel.ALIGNMENT_MID_CENTER },
        { header: 'Số điện thoại', key: 'soDienThoai', width: 15, style: stylesExcel.ALIGNMENT_MID_CENTER },
        { header: 'Khóa học', key: 'khoaHoc', width: 10, style: stylesExcel.ALIGNMENT_MID_CENTER },
        { header: 'Khoa', key: 'tenDonVi', width: 30, style: stylesExcel.ALIGNMENT_MID },
        { header: 'Ngành học', key: 'nganhHoc', width: 30, style: stylesExcel.ALIGNMENT_MID },
        { header: 'Chi đoàn', key: 'lopSV', width: 15, style: stylesExcel.ALIGNMENT_MID },
        { header: 'Chức vụ', key: 'chucVu', width: 20, style: stylesExcel.ALIGNMENT_MID },
        { header: 'Ngày vào đoàn', key: 'ngayVaoDoan', width: 15, style: stylesExcel.SHORT_DATE_FORMAT },
        { header: 'Nơi vào đoàn', key: 'noiVaoDoan', width: 20, style: stylesExcel.ALIGNMENT_MID },
        { header: 'Số thẻ đoàn', key: 'soTheDoan', width: 20, style: stylesExcel.ALIGNMENT_MID },
        { header: 'Sổ đoàn', key: 'trangThaiSoDoan', width: 10, style: stylesExcel.ALIGNMENT_MID_CENTER },
        { header: 'Kích hoạt tài khoản', key: 'kichHoatTaiKhoan', width: 20, style: stylesExcel.ALIGNMENT_MID_CENTER },
        { header: 'Trạng thái', key: 'trangThai', width: 15, style: stylesExcel.ALIGNMENT_MID_CENTER },
    ]

    let stt = 1
    const data = students.map(student => {
        return {
            number: stt++,
            maSoSV: student.maSoSV,
            ho: student.ho,
            ten: student.ten,
            ngaySinh: student.ngaySinh ? addHours(7, student.ngaySinh) : '',
            gioiTinh: student.gioiTinh,
            danToc: student.danToc,
            tonGiao: student.tonGiao,
            diaChi: student.diaChi,
            doanVien: student.doanVien === true ? 1 : 0,
            tinhTrang: student.tinhTrang,
            soDienThoai: student.soDienThoai,
            khoaHoc: student.khoaHoc,
            tenDonVi: student.donVi?.tenDonVi,
            nganhHoc: student.nganhHoc,
            lopSV: student.lopSV?.tenLop,
            chucVu: student.chucVu,
            ngayVaoDoan: student.thongTinDoanVien?.ngayVaoDoan ? addHours(7, student.thongTinDoanVien.ngayVaoDoan) : '',
            noiVaoDoan: student.thongTinDoanVien?.noiVaoDoan,
            soTheDoan: student.thongTinDoanVien?.soTheDoan,
            trangThaiSoDoan: student.thongTinDoanVien?.trangThaiSoDoan === 'DA_NOP' ? '1': '0',
            kichHoatTaiKhoan: student.kichHoatTaiKhoan ? 'Đã kích hoạt' : 'Chưa kích hoạt',
            trangThai: student.trangThai ? 'Đang dùng' : 'Tạm khóa',
        }
    })

    return {
        columns,
        data
    }
}

module.exports = {
    getXlsForStudents
}