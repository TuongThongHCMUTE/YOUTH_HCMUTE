const { getQueryParameter, stylesExcel, exportExcel, addHours } = require('../common/index')
const Student = require('../models/student')
const Bill = require('../models/bill')
const PriceList = require('../models/priceList')
const GroupBook = require('../models/groupBook')
const excelController = require('../common/xls/studentsXls')

// Get all student
exports.getAllStudents = async (req, res, next) => {
    try {
        const { sort, limit, skip, query } = getQueryParameter(req)

        const students = await Student.find(query).sort(sort).skip(skip).limit(limit)
                                        .select('-bills')
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
                                        .select('-bills')
                                        .populate('donVi', 'tenDonVi')
                                        .populate('lopSV', 'tenLop nganhHoc')
                                        .populate('thongTinDoanVien.soDoan', 'trangThaiSoDoan')

        const { columns, data } = excelController.getXlsForStudents(students)

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
                                        .select('-bills')
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
                                        .select('-bills')
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
                namHoc: '2022-2023',
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
                                        .select('-bills')
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
                                        .select('-bills')
                                        .populate('donVi', 'tenDonVi')
                                        .populate('lopSV', 'tenLop nganhHoc')

        let groupBook = await GroupBook.findOne({maSoSV: student.maSoSV})
        if (groupBook) {
            groupBook.trangThaiSoDoan = student.thongTinDoanVien.trangThaiSoDoan
            await groupBook.save()
        } else if (student.thongTinDoanVien?.trangThaiSoDoan) {
            groupBook = await GroupBook.create({
                sinhVien: student._id,
                maSoSV: student.maSoSV,
                trangThaiSoDoan: student.thongTinDoanVien.trangThaiSoDoan
            })

            student.thongTinDoanVien.soDoan = groupBook._id
            await student.save()
        }

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
                                        .select('-bills')
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