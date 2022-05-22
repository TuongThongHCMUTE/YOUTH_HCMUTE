const moment = require('moment')
const Common = require('../common/methods')
const Bill = require('../models/bill')
const GroupBook = require('../models/groupBook')
const Student = require('../models/student')

const getPaymentDateQuery = (query) => {
    if (query.startDate && query.endDate) {
        const startDate = new Date(query.startDate)
        const endDate = new Date(query.endDate)
        
        query.ngayThanhToan = { $gte: startDate, $lte: endDate }
    }

    delete query.startDate
    delete query.endDate

    if(!query.ngayThanhToan) {
        delete query.ngayThanhToan
    }

    return query
}
// Get all Bills
exports.getAllBills = async (req, res, next) => {
    try {
        const { sort, limit, skip, query } = Common.getQueryParameter(req)
        getPaymentDateQuery(query)

        const bills = await Bill.find(query).sort(sort).skip(skip).limit(limit)
                                    .populate('sinhVien','ho ten')
                                    .populate('donVi', 'tenDonVi')
                                    
        const countAll = await Bill.countDocuments(query)
        
        res.status(200).json({
            status: 'success',
            all: countAll,
            results: bills.length,
            data: {bills}
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

// Export excel all Bills
exports.exportExcelAllBills = async (req, res, next) => {
    try {
        const { sort, limit, skip, query } = Common.getQueryParameter(req)
        getPaymentDateQuery(query)

        const bills = await Bill.find(query).sort(sort).skip(skip).limit(limit)
                                    .populate('sinhVien','ho ten')
                                    .populate('donVi', 'tenDonVi')

        const columns = [
            { header: 'Mã số sinh viên', key: 'maSoSV', width: 15, style: {alignment: { vertical: 'middle', horizontal: 'center' }} },
            { header: 'Họ và tên', key: 'hoVaTen', width: 30, style: {alignment: { vertical: 'middle'}} },
            { header: 'Đơn vị', key: 'tenDonVi', width: 30, style: {alignment: { vertical: 'middle'}} },
            { header: 'Trạng thái', key: 'trangThai', width: 20, style: {alignment: { vertical: 'middle', horizontal: 'center' }} },
            { header: 'Tổng tiền', key: 'tongTien', width: 15, style: {alignment: { vertical: 'middle'}} },
            { header: 'Ngày thanh toán', key: 'ngayThanhToan', width: 25, style: {alignment: { vertical: 'middle'}}},
        ]

        const data = bills.map(bill => {
            return {
                maSoSV: bill.maSoSV,
                hoVaTen: bill.sinhVien.ho + ' ' + bill.sinhVien.ten,
                tenDonVi: bill.donVi?.tenDonVi,
                trangThai: bill.trangThai ? 'Đã thanh toán' : 'Chưa thanh toán',
                tongTien: bill.tongTien,
                ngayThanhToan: moment(bill.ngayThanhToan).format('DD/MM/YYYY hh:mm')
            }
        })

        Common.exportExcel('Bills', columns, data, res)
    } catch (e) {
        console.log(e)
        next(e)
    }
}

exports.getKPIValuesByCheckoutDate = async (req, res, next) => {
    try {
        const { query } = Common.getQueryParameter(req)
        getPaymentDateQuery(query)

        const bills = await Bill.find(query)

        let kpiValues = []
        let tongDoanPhi = 0
        bills.forEach(bill => {
            let priceLists = bill.cacKhoanPhi

            priceLists.forEach(priceList => {
                let value = priceList.tenChiPhi == 'Sổ đoàn viên' ? priceList.soLuong : priceList.thanhTien
                let kpi = kpiValues.find(kpi => kpi.name == priceList.tenChiPhi)

                if (kpi) {
                    kpi.total += value
                } else {
                    kpi = {
                        name: priceList.tenChiPhi,
                        total: value
                    }
                    kpiValues.push(kpi)
                }
            })

            tongDoanPhi += bill.tongTien
        })

        kpiValues.unshift(
            {
                name: 'Tổng tiền đã thu',
                total: tongDoanPhi
            },
            {
                name: 'Tổng số hóa đơn',
                total: bills.length
            }
        )

        res.status(200).json({
            status: 'success',
            results: kpiValues.length,
            data: {kpiValues}
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

// Create new Bill
exports.createOneBill = async (req, res, next) => {
    try {
        console.log(req.body)
        
        const bill = await Bill.create({ ...req.body })

        res.status(200).json({
            status: 'success',
            data: { bill }
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

// Get one Bill
exports.getOneBill = async (req, res, next) => {
    try {
        const { id } = req.params

        const bill = await Bill.findById(id)

        res.status(200).json({
            status: 'success',
            data: {bill}
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

// Update one Bill
exports.updateOneBill = async (req, res, next) => {
    try {
        const { id } = req.params

        const bill = await Bill.findByIdAndUpdate(id, {...req.body}, {new: true, runValidators: true})

        res.status(200).json({
            status: 'success',
            data: { bill }
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

// Checkout bill
exports.checkOutBill = async (req, res, next) => {
    try {
        const { id } = req.params

        let bill = await Bill.findById(id)
        if (bill) {
            bill.trangThai = true,
            bill.ngayThanhToan = bill.ngayThanhToan ? bill.ngayThanhToan : new Date()
            await bill.save()
        }
        
        let bookSummit = bill.cacKhoanPhi.find(data => data.tenChiPhi == 'Sổ đoàn viên' && data.soLuong == 1)    
        let groupBook = await GroupBook.findOne({maSoSV: bill.maSoSV})

        if (bookSummit) {
            groupBook = groupBook ? groupBook : await GroupBook.create({
                sinhVien: bill.sinhVien,
                maSoSV: bill.maSoSV,
                trangThaiSoDoan: 'DA_NOP',
                ngayNopSo: bill.ngayThanhToan
            })

            await Student.findOneAndUpdate({maSoSV: bill.maSoSV},
                {
                    'thongTinDoanVien.trangThaiSoDoan': groupBook.trangThaiSoDoan,
                    'thongTinDoanVien.soDoan': groupBook._id
                })
        }

        const student = await Student.findOne({maSoSV: bill.maSoSV})
                                        .populate('donVi', 'tenDonVi')
                                        .populate('lopSV', 'tenLop')
                                        .populate('thongTinDoanVien.soDoan', 'trangThaiSoDoan')

        res.status(200).json({
            status: 'success',
            data: {
                bill,
                student
            }
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

// Cancel Bill Payment
exports.cancelPayment = async (req, res, next) => {
    try {
        const { id } = req.params
        const huySoDoan = req.query.huySoDoan == 'true' ? true : false

        const bill = await Bill.findByIdAndUpdate(id,
            {
                trangThai: false,
                ngayThanhToan: null
            }
            , {new: true, runValidators: true})
                                    .populate('sinhVien','ho ten')
                                    .populate('donVi', 'tenDonVi')

        if (huySoDoan) {
            await GroupBook.findOneAndDelete({maSoSV: bill.maSoSV})
            await Student.findOneAndUpdate({maSoSV: bill.maSoSV},
                {
                    'thongTinDoanVien.trangThaiSoDoan': null,
                    'thongTinDoanVien.soDoan': null
                },
                {new: true, runValidators: true}
            )
        }

        res.status(200).json({
            status: 'success',
            data: {
                bill
            }
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

// Delete one Bill
exports.deleteOneBill = async (req, res, next) => {
    try {
        const { id } = req.params

        const bill = await Bill.findByIdAndDelete(id)

        res.status(200).json({
            status: 'success',
            data: {bill}
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}