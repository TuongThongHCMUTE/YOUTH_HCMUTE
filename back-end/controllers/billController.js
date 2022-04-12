const Common = require('../common/methods')
const Bill = require('../models/bill')
const GroupBook = require('../models/groupBook')
const Student = require('../models/student')

// Get all Bills
exports.getAllBills = async (req, res, next) => {
    try {
        if (req.query.startDate && req.query.endDate) {
            const startDate = new Date(req.query.startDate)
            delete req.query.startDate
            const endDate = new Date(req.query.endDate)
            delete req.query.endDate

            req.query.ngayThanhToan = {
                $gte: startDate, 
                $lte: endDate
            }
        }
        const { sort, limit, skip, query } = Common.getQueryParameter(req)

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

exports.getKPIValuesByCheckoutDate = async (req, res, next) => {
    try {
        const startDate = new Date(req.query.startDate)
        delete req.query.startDate
        const endDate = new Date(req.query.endDate)
        delete req.query.endDate

        const bills = await Bill.find({
            ...req.query,
            ngayThanhToan: {
                $gte: startDate, 
                $lte: endDate 
            }
        })

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