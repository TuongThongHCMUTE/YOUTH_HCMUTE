const { getQueryParameter } = require('../common/index')
const PriceList = require('../models/priceList')

// Get all PriceLists
exports.getAllPriceLists = async (req, res, next) => {
    try {
        const { sort, limit, skip, query } = getQueryParameter(req)

        const priceLists = await PriceList.find(query).sort(sort).skip(skip).limit(limit);
        const countAll = await PriceList.countDocuments(query)
        
        res.status(200).json({
            status: 'success',
            all: countAll,
            results: priceLists.length,
            data: {priceLists}
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

// Create new PriceList
exports.createOnePriceList = async (req, res, next) => {
    try {
        const priceList = await PriceList.create({ ...req.body })

        res.status(200).json({
            status: 'success',
            data: { priceList }
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

// Get one PriceList
exports.getOnePriceList = async (req, res, next) => {
    try {
        const { id } = req.params

        const priceList = await PriceList.findById(id)

        res.status(200).json({
            status: 'success',
            data: {priceList}
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

// Update one PriceList
exports.updateOnePriceList = async (req, res, next) => {
    try {
        const { id } = req.params

        const priceList = await PriceList.findByIdAndUpdate(id, {...req.body}, {new: true, runValidators: true})

        res.status(200).json({
            status: 'success',
            data: { priceList }
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

// Delete one PriceList
exports.deleteOnePriceList = async (req, res, next) => {
    try {
        const { id } = req.params

        const priceList = await PriceList.findByIdAndDelete(id)

        res.status(200).json({
            status: 'success',
            data: {priceList}
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}