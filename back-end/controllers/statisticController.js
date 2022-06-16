const Student = require('../models/student')
const Manager = require('../models/manager')
const Faculty = require('../models/faculty')

// Statistical data for landing page
exports.getDataForLandingPage = async (req, res, next) => {
    try {
        const totalStudents = await Student.countDocuments({})
        const totalUnionsMembers = await Student.countDocuments({doanVien: true})
        const totalFaculties = await Faculty.countDocuments({loaiDonVi: 'DOAN_KHOA'})

        res.status(200).json({
            status: 'success',
            data: {
                totalStudents,
                totalUnionsMembers,
                totalFaculties
            }
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

// Count students by faculty
exports.countStudentsByFaculty = async (req, res, next) => {
    try {
        const studentsByFaculty = await Student.aggregate([
            {$group: {_id: '$donVi', count: {$sum: 1}}}
        ])

        const faculties = await Faculty.find({}).sort({tenDonVi: 1})

        const countByFaculty = faculties.map(faculty => {
            const dataCount = studentsByFaculty.find(x => x._id?.toString() == faculty._id)
            return {
                _id: faculty._id,
                tenDonVi: faculty.tenDonVi,
                count: dataCount ? dataCount.count : 0
            }
        })

        res.status(200).json({
            status: 'success',
            results: countByFaculty.length,
            data: countByFaculty
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

// Statistical data user
exports.countUserByRole = async (req, res, next) => {
    try {
        const totalStudents = await Student.countDocuments({})

        const managersByRole = await Manager.aggregate([
            {$group: {_id: '$role', count: {$sum: 1}}}
        ])

        const usersByRole = [{_id: 'DOAN_VIEN', count: totalStudents}].concat(managersByRole)

        res.status(200).json({
            status: 'success',
            results: usersByRole.length,
            data: usersByRole
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}