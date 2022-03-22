const Common = require('../common/methods')
const Faculty = require('../models/faculty')

// Get all faculty
exports.getAllFaculties = async (req, res, next) => {
    try {
        const { sort, limit, skip, query } = Common.getQueryParameter(req)

        const faculties = await Faculty.find(query).sort(sort).skip(skip).limit(limit);
        const countAll = await Faculty.countDocuments({})
        
        res.status(200).json({
            status: 'success',
            all: countAll,
            results: faculties.length,
            data: {faculties}
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

// Create new faculty
exports.createOneFaculty = async (req, res, next) => {
    try {
        const faculties = await Faculty.create({...req.body})

        res.status(200).json({
            status: 'success',
            data: {faculties}
        })
    } catch (error) {
        next(error)
    }
}

// Get one faculty
exports.getOneFaculty = async (req, res, next) => {
    try {
        const { id } = req.params

        const faculty = await Faculty.findById(id)

        res.status(200).json({
            status: 'success',
            data: {faculty}
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

// Update one faculty
exports.updateOneFaculty = async (req, res, next) => {
    try {
        const { id } = req.params

        const faculty = await Faculty.findByIdAndUpdate(id, {...req.body}, {new: true, runValidators: true})

        res.status(200).json({
            status: 'success',
            data: { faculty }
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

// Delete one faculty
exports.deleteOneFaculty = async (req, res, next) => {
    try {
        const { id } = req.params

        const faculty = await Faculty.findByIdAndDelete(id)

        res.status(200).json({
            status: 'success',
            data: {faculty}
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}