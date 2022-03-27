const Common = require('../common/methods')
const Bill = require('../models/bill')

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