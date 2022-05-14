const Common = require('../common/methods')
const GroupBook = require('../models/groupBook')

// Get all GroupBooks
exports.getAllGroupBooks = async (req, res, next) => {
    try {
        const { sort, limit, skip, query } = Common.getQueryParameter(req)

        const groupBooks = await GroupBook.find(query).sort(sort).skip(skip).limit(limit)
                                    .populate('sinhVien', 'maSoSV ho ten')
        const countAll = await GroupBook.countDocuments(query)
        
        res.status(200).json({
            status: 'success',
            all: countAll,
            results: groupBooks.length,
            data: {groupBooks}
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

// Create new GroupBook
exports.createOneGroupBook = async (req, res, next) => {
    try {
        const groupBook = await GroupBook.create({ ...req.body })

        res.status(200).json({
            status: 'success',
            data: { groupBook }
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

// Get one GroupBook
exports.getOneGroupBook = async (req, res, next) => {
    try {
        const { id } = req.params

        const groupBook = await GroupBook.findById(id)
                                    .populate('sinhVien', 'maSoSV ho ten')

        res.status(200).json({
            status: 'success',
            data: {groupBook}
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

// Update one GroupBook
exports.updateOneGroupBook = async (req, res, next) => {
    try {
        const { id } = req.params

        const groupBook = await GroupBook.findByIdAndUpdate(id, {...req.body}, {new: true, runValidators: true})
                                    .populate('sinhVien', 'maSoSV ho ten')

        res.status(200).json({
            status: 'success',
            data: { groupBook }
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

// Delete one GroupBook
exports.deleteOneGroupBook = async (req, res, next) => {
    try {
        const { id } = req.params

        const groupBook = await GroupBook.findByIdAndDelete(id)
                                    .populate('sinhVien', 'maSoSV ho ten')

        res.status(200).json({
            status: 'success',
            data: {groupBook}
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}