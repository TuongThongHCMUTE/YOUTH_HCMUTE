const { getQueryParameter, exportExcel } = require('../common/index')
const Student = require('../models/student')
const Bill = require('../models/bill')
const PriceList = require('../models/priceList')
const Excel = require('exceljs')
const excelController = require('../common/xls/studentBillsXls')

const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)

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

// Const get default bills
const getDefaultBill = (student, priceLists, data) => {
    let bill = new Bill({
        sinhVien: student._id,
        donVi: student.donVi,
        maSoSV: student.maSoSV,
        namHoc: '2022-2023',
        trangThai: true,
        ngayThanhToan: new Date(),
        cacKhoanPhi: [] 
    })

    let khoanPhi = {}
    priceLists.forEach((priceList) => {
        khoanPhi = {
            thuTu: priceList.thuTu,
            bieuPhi: priceList._id,
            tenChiPhi: priceList.tenChiPhi,
            donViTinh: priceList.donViTinh,
            tongTien: 0,
            donGia: priceList.donGia
        }

        if (priceList.tenChiPhi == 'Đoàn phí') {
            khoanPhi = {
                ...khoanPhi,
                ngayBatDau: priceList.thongTinMacDinh.ngayBatDau,
                ngayKetThuc: priceList.thongTinMacDinh.ngayKetThuc,
                thanhTien: parseInt(data.doanPhi),
                soLuong: data.doanPhi / priceList.donGia
            }
            bill.tongTien += khoanPhi.thanhTien
        }

        if (priceList.tenChiPhi == 'Kinh phí đóng góp công trình thanh niên') {
            khoanPhi = {
                ...khoanPhi,
                thanhTien: parseInt(data.cttn),
                soLuong: data.cttn / priceList.donGia
            }
            bill.tongTien += khoanPhi.thanhTien
        }

        bill.cacKhoanPhi.push(khoanPhi)
    })

    return bill
}

const getDataErrors = (importData, students, bills) => {
    const dataErrors = []

    const headerData = importData[2]
    if (headerData.stt != 'STT' || headerData.hoVaTen != 'HỌ VÀ TÊN'|| headerData.maSoSV != 'MSSV' || headerData.doanPhi != 'ĐOÀN PHÍ' || headerData.cttn != 'CTTN') {
        err = {
            key: `Thứ tự cột`,
            message: 'Thứ tự cột không đúng'
        }
        dataErrors.push(err)
    }

    importData.splice(0, 3)
    importData.forEach(data => {
        const student = students.find(x => x.maSoSV == data.maSoSV)
        const bill = bills.find(x => x.maSoSV == data.maSoSV)

        let err = {}
        if (isNaN(data.doanPhi) || data.doanPhi < 0) {
            err = {
                key: `STT ${data.stt}`,
                message: 'Tiền đoàn phí không hợp lệ'
            }
            dataErrors.push(err)
        }

        if (isNaN(data.cttn) || data.cttn <= 0) {
            err = {
                key: `STT ${data.stt}`,
                message: 'Tiền công trình thanh niên không hợp lệ'
            }
            dataErrors.push(err)
        }

        if (!student) {
            err = {
                key: `STT ${data.stt}`,
                message: 'Mã số sinh viên không đúng'
            }
            dataErrors.push(err)
        } else if (bill && bill.trangThai == true) {
            err = {
                key: `STT ${data.stt}`,
                message: 'Sinh viên đã đóng đoàn phí'
            }
            dataErrors.push(err)
        } else if (bill && bill.trangThai == false) {
            err = {
                key: `STT ${data.stt}`,
                message: 'Sinh viên đã tồn tại hóa đơn'
            }
            dataErrors.push(err)
        }
    })

    return dataErrors
}

exports.importBillsOfStudents = async (req, res, next) => {
    try {
        const file = req.file

        const workbook = new Excel.Workbook()
        await workbook.xlsx.readFile(file.path)
        // Delete file on local
        await unlinkFile(file.path)
        const worksheet = workbook.getWorksheet(1)

        var importData = [{}]
        // Iterate over all rows that have values in a worksheet
        worksheet.eachRow(function(row, rowNumber) {
            let data = {
                stt: row.values[1],
                hoVaTen: row.values[2],
                maSoSV: row.values[3] ? row.values[3].toString() : undefined,
                doanPhi: row.values[4],
                cttn: row.values[5],
            }        

            importData.push(data)
        })
        
        const maSoSVs = importData.map(data => data.maSoSV)
        const students = await Student.find({maSoSV: { $in: maSoSVs}})
        const bills = await Bill.find({maSoSV: { $in: maSoSVs}})

        const dataErrors = getDataErrors(importData, students, bills)

        if (dataErrors.length > 0) {
            return res.status(400).json({
                status: 'fail',
                count: dataErrors.length,
                errors: dataErrors
            })
        }

        const priceLists = await PriceList.find({'hienThi': true}).sort({thuTu:1})
        students.forEach(async student => {
            const data = importData.find(x => x.maSoSV == student.maSoSV)

            let bill = getDefaultBill(student, priceLists, data)

            student.bills.push({
                bill: bill._id,
                trangThai: bill.trangThai
            })

            await bill.save()
            await student.save()

            console.log(bill.toJSON())
            console.log(student.toJSON())
        })

        res.status(200).json({
            status: 'success',
            message: 'Upload file thành công',
            data: {
                importData
            }
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}