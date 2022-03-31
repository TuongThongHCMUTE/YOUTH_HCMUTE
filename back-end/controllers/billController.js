const Common = require('../common/methods')
const Bill = require('../models/bill')
const GroupBook = require('../models/groupBook')
const Student = require('../models/student')

// Get all Bills
exports.getAllBills = async (req, res, next) => {
    try {
        const { sort, limit, skip, query } = Common.getQueryParameter(req)

        const bills = await Bill.find(query).sort(sort).skip(skip).limit(limit);
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

        const bill = await Bill.findById(id)
        if (!bill.trangThai) {
            bill.trangThai = true
            bill.ngayThanhToan = bill.ngayThanhToan ? bill.ngayThanhToan : new Date()
            await bill.save()
        }
        
        let bookSummit = bill.cacKhoanPhi.find(data => data.tenChiPhi == 'Sổ đoàn viên' && data.soLuong == 1)    
        const groupBook = await GroupBook.findOne({maSoSV: bill.maSoSV})

        let student = await Student.findOne({maSoSV: bill.maSoSV})
                                            .populate('donVi', 'tenDonVi')
                                            .populate('lopSV', 'tenLop')
                                            .populate('thongTinDoanVien.soDoan', 'trangThaiSoDoan')
        if (bookSummit && !groupBook) {
            let groupBookInfo = {
                sinhVien: bill.sinhVien,
                maSoSV: bill.maSoSV,
                trangThaiSoDoan: 'DA_NOP',
                ngayNopSo: bill.ngayThanhToan
            }
            
            const newGroupBook = await GroupBook.create({...groupBookInfo})

            student.thongTinDoanVien.trangThaiSoDoan = newGroupBook.trangThaiSoDoan,
            student.thongTinDoanVien.soDoan = newGroupBook._id
            await student.save()

            student = await Student.findOne({maSoSV: bill.maSoSV})
                                        .populate('donVi', 'tenDonVi')
                                        .populate('lopSV', 'tenLop')
                                        .populate('thongTinDoanVien.soDoan', 'trangThaiSoDoan')
        }

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