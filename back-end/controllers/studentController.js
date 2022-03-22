const Common = require('../common/methods')
const Student = require('../models/student')
const Bill = require('../models/bill')

// Get all student
exports.getAllStudents = async (req, res, next) => {
    try {
        const { sort, limit, skip, query } = Common.getQueryParameter(req)

        const students = await Student.find(query).sort(sort).skip(skip).limit(limit);
        const countAll = await Student.countDocuments({})

        res.status(200).json({
            status: 'success',
            all: countAll,
            results: students.length,
            data: {students}
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

// Create new student
exports.createOneStudent = async (req, res, next) => {
    try {
        console.log(req.body)
        
        const student = await Student.create({...req.body})

        res.status(200).json({
            status: 'success',
            data: {student}
        })
    } catch (error) {
        next(error)
    }
}

// Get one student
exports.getOneStudent = async (req, res, next) => {
    try {
        const { id } = req.params

        const student = await Student.findById(id)

        res.status(200).json({
            status: 'success',
            data: {student}
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

// Get student info by maSoSV
exports.getStudentInfo = async (req, res, next) => {
    try {
        const { maSoSV } = req.params
        const { maNamHoc } = req.query

        const student = await Student.findOne({ maSoSV }).populate('donVi', 'tenDonVi')
        const bill = await Bill.findOne({ maSoSV, maNamHoc })

        res.status(200).json({
            status: 'success',
            data: {
                student,
                bill
            }
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

// Update one student
exports.updateOneStudent = async (req, res, next) => {
    try {
        const { id } = req.params

        const student = await Student.findByIdAndUpdate(id, {...req.body}, {new: true, runValidators: true})

        res.status(200).json({
            status: 'success',
            data: { student }
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

// Delete one student
exports.deleteOneStudent = async (req, res, next) => {
    try {
        const { id } = req.params

        const student = await Student.findByIdAndDelete(id)

        res.status(200).json({
            status: 'success',
            data: {student}
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}