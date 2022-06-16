const { getQueryParameter, stylesExcel, exportExcel, addHours } = require('../common/index')
const Student = require('../models/student')
const Bill = require('../models/bill')
const PriceList = require('../models/priceList')

// Get all student
exports.getAllStudents = async (req, res, next) => {
    try {
        const { sort, limit, skip, query } = getQueryParameter(req)

        const students = await Student.find(query).sort(sort).skip(skip).limit(limit)
                                        .populate('donVi', 'tenDonVi')
                                        .populate('lopSV', 'tenLop nganhHoc')
                                        .populate('thongTinDoanVien.soDoan', 'trangThaiSoDoan')

        const countAll = await Student.countDocuments(query)

        res.status(200).json({
            status: 'success',
            all: countAll,
            results: students.length,
            data: {students}
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

// Export excel all Students
exports.exportExcelAllStudents = async (req, res, next) => {
    try {
        const { sort, limit, skip, query } = getQueryParameter(req)

        const students = await Student.find(query).sort(sort).skip(skip).limit(limit)
                                        .populate('donVi', 'tenDonVi')
                                        .populate('lopSV', 'tenLop nganhHoc')
                                        .populate('thongTinDoanVien.soDoan', 'trangThaiSoDoan')

        const columns = [
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

        const data = students.map(student => {
            return {
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

        exportExcel('Students', columns, data, res)
    } catch (e) {
        console.log(e)
        next(e)
    }
}

// Create new student
exports.createOneStudent = async (req, res, next) => {
    try {
        console.log(req.body)
        
        const student = await Student.create({...req.body})

        res.status(200).json({
            status: 'success',
            data: {student}
        })
    } catch (error) {
        next(error)
    }
}

// Get one student
exports.getOneStudent = async (req, res, next) => {
    try {
        const { id } = req.params

        const student = await Student.findById(id)
                                        .populate('donVi', 'tenDonVi')
                                        .populate('lopSV', 'tenLop nganhHoc')
                                        .populate('thongTinDoanVien.soDoan', 'trangThaiSoDoan')

        res.status(200).json({
            status: 'success',
            data: {student}
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

// Get student info by maSoSV
exports.getStudentBarcode = async (req, res, next) => {
    try {
        const { maSoSV } = req.params
        const { maNamHoc } = req.query

        const student = await Student.findOne({ maSoSV })
                                        .populate('donVi', 'tenDonVi')
                                        .populate('lopSV', 'tenLop nganhHoc')
                                        .populate('thongTinDoanVien.soDoan', 'trangThaiSoDoan')
        let bill = await Bill.findOne({ maSoSV, maNamHoc })

        let newBill = false
        if (student && !bill) {
            newBill = true

            bill = new Bill({
                sinhVien: student._id,
                donVi: student.donVi,
                maSoSV: student.maSoSV,
                namHoc: '2021-2022',
                cacKhoanPhi: [] 
            });

            const priceLists =  await PriceList.find({'hienThi': true}).sort({thuTu:1})
            
            let khoanPhi = {}
            let tongTien = 0
            priceLists.forEach((priceList) => {
                khoanPhi = {
                    ...priceList.thongTinMacDinh,
                    thuTu: priceList.thuTu,
                    bieuPhi: priceList._id,
                    tenChiPhi: priceList.tenChiPhi,
                    donViTinh: priceList.donViTinh,
                    donGia: priceList.donGia,
                    ghiChu: priceList.ghiChu
                }

                tongTien += khoanPhi.thanhTien
                bill.cacKhoanPhi.push(khoanPhi)
            })

            bill.tongTien = tongTien
            console.log(bill)
        }

        res.status(200).json({
            status: 'success',
            data: {
                student,
                bill,
                hoaDonMoi: newBill
            }
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

// Get student info for class
exports.getStudentInfo = async (req, res, next) => {
    try {
        const { maSoSV } = req.params

        const student = await Student.findOne({ maSoSV })
                                        .populate('donVi', 'tenDonVi')
                                        .populate('lopSV', 'tenLop nganhHoc')
                                        .populate('thongTinDoanVien.soDoan', 'trangThaiSoDoan')

        res.status(200).json({
            status: 'success',
            data: {
                student
            }
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}
// Update one student
exports.updateOneStudent = async (req, res, next) => {
    try {
        const { id } = req.params

        const student = await Student.findByIdAndUpdate(id, {...req.body}, {new: true, runValidators: true})
                                        .populate('donVi', 'tenDonVi')
                                        .populate('lopSV', 'tenLop nganhHoc')
                                        .populate('thongTinDoanVien.soDoan', 'trangThaiSoDoan')

        res.status(200).json({
            status: 'success',
            data: { student }
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

// Delete one student
exports.deleteOneStudent = async (req, res, next) => {
    try {
        const { id } = req.params

        const student = await Student.findByIdAndDelete(id)
                                        .populate('donVi', 'tenDonVi')
                                        .populate('lopSV', 'tenLop nganhHoc')
                                        .populate('thongTinDoanVien.soDoan', 'trangThaiSoDoan')

        res.status(200).json({
            status: 'success',
            data: {student}
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}