const Common = require('../common/methods')
const Class = require('../models/class')

// Get all Classes
exports.getAllClasses = async (req, res, next) => {
    try {
        const { sort, limit, skip, query } = Common.getQueryParameter(req)

        const classes = await Class.find(query).sort(sort).skip(skip).limit(limit);
        const countAll = await Class.countDocuments({})
        
        res.status(200).json({
            status: 'success',
            all: countAll,
            results: classes.length,
            data: {classes}
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

// Create new Class
exports.createOneClass = async (req, res, next) => {
    try {
        console.log(req.body)
        
        const a_class = await Class.create({ ...req.body })

        res.status(200).json({
            status: 'success',
            data: { a_class }
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

// Get one Class
exports.getOneClass = async (req, res, next) => {
    try {
        const { id } = req.params

        const a_class = await Class.findById(id)

        res.status(200).json({
            status: 'success',
            data: {a_class}
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

// Update one Class
exports.updateOneClass = async (req, res, next) => {
    try {
        const { id } = req.params

        const a_class = await Class.findByIdAndUpdate(id, {...req.body}, {new: true, runValidators: true})

        res.status(200).json({
            status: 'success',
            data: { a_class }
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

// Delete one Class
exports.deleteOneClass = async (req, res, next) => {
    try {
        const { id } = req.params

        const a_class = await Class.findByIdAndDelete(id)

        res.status(200).json({
            status: 'success',
            data: {a_class}
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}