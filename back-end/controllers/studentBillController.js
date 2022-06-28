const { getQueryParameter, exportExcel } = require('../common/index')
const Student = require('../models/student')
const Bill = require('../models/bill')
const Excel = require('exceljs')
const excelController = require('../common/xls/studentBillsXls')

// Get all Bills
exports.getAllStudentBills = async (req, res, next) => {
    try {
        const { doanPhi, soDoan, xls } = req.query
        delete req.query?.doanPhi
        delete req.query?.soDoan
        delete req.query?.xls

        const { sort, limit, skip, query } = getQueryParameter(req)

        if (doanPhi == 'da-dong') {
            query.bills = {$elemMatch: {trangThai: true}}
        } else if (doanPhi == 'chua-dong') {
            query['$or'] = [
                {'bills.trangThai': { $exists: false }},
                {'bills.trangThai': false}
            ]
        }

        if (soDoan == 'da-nop') {
            query['thongTinDoanVien.trangThaiSoDoan'] = 'DA_NOP'
        } else if (soDoan == 'chua-nop') {
            if (doanPhi == 'chua-dong') {
                query['$and'] = [
                    { ...query['$or']},
                    { 
                        $or: [
                            {'thongTinDoanVien.trangThaiSoDoan': { $exists: false }},
                            {'thongTinDoanVien.trangThaiSoDoan': 'CHUA_NOP'}
                        ]
                    }
                ]

                delete query['$or']
            } else {
                query['$or'] = [
                    {'thongTinDoanVien.trangThaiSoDoan': { $exists: false }},
                    {'thongTinDoanVien.trangThaiSoDoan': 'CHUA_NOP'}
                ]
            }
        }

        let studentBills = await Student.find(query).sort(sort).skip(skip).limit(limit)
                                                        .populate('donVi', 'tenDonVi')
                                                        .populate('lopSV', 'tenLop')
                                                        .populate('thongTinDoanVien.soDoan', 'trangThaiSoDoan ngayNopSo')
                                                        .populate('bills.bill', 'tongTien ngayThanhToan')
        const countAll = await Student.countDocuments(query)

        studentBills = studentBills.map(studentBill => {
            const { bills, ...student } = studentBill.toJSON()
            const bill = bills[0]

            return {
                ...student,
                bill: {
                    _id: bill?._id,
                    trangThai: bill?.trangThai ? 'Đã đóng' : 'Chưa đóng',
                    tongTien: bill?.bill?.tongTien,
                    ngayThanhToan: bill?.bill?.ngayThanhToan
                }

            }
        })

        if (xls == 'true') {
            const { columns, data } = excelController.getXlsForStudentBills(studentBills)
            return exportExcel('StudentBills', columns, data, res)
        }
                                    
        res.status(200).json({
            status: 'success',
            all: countAll,
            results: studentBills.length,
            data: {studentBills}
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

// Export excel all Bills
exports.exportExcelAllBills = async (req, res, next) => {
    try {
        const { sort, limit, skip, query } = getQueryParameter(req)
        getPaymentDateQuery(query)

        const bills = await Bill.find(query).sort(sort).skip(skip).limit(limit)
                                    .populate('sinhVien','ho ten')
                                    .populate('donVi', 'tenDonVi')
        
        const { columns, data } = excelController.getXlsForBills(bills)

        exportExcel('Bills', columns, data, res)
    } catch (e) {
        console.log(e)
        next(e)
    }
}

exports.importBillsOfStudents = async (req, res, next) => {
    try {
        
    } catch (e) {
        console.log(e)
        next(e)
    }
}