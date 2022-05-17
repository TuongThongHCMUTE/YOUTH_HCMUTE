const Student = require('../models/student')
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