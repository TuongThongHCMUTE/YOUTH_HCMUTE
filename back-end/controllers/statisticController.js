const Student = require('../models/student')
const Manager = require('../models/manager')
const Faculty = require('../models/faculty')
const Bill = require('../models/bill')

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

// Students
// Statistic students
exports.statisticStudents = async (req, res, next) => {
    try {
        const totalStudents = await Student.countDocuments({})
        const totalUnionsMembers = await Student.countDocuments({doanVien: true})
        const totalYouth = totalStudents - totalUnionsMembers

        const studentsByYear = await Student.aggregate([
            {$group: {_id: '$khoaHoc', count: {$sum: 1}}}
        ])

        res.status(200).json({
            status: 'success',
            data: {
                countData: {
                    totalStudents,
                    totalUnionsMembers,
                    totalYouth
                },
                studentsByYear
            }
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

// Receipts
exports.statisticBills = async (req, res, next) => {
    try {
        const totalUnionsMembers = await Student.countDocuments({doanVien: true})
        const totalPaid = await Bill.countDocuments({trangThai: true})
        const totalUnPaid = totalUnionsMembers - totalPaid

        // Đếm số lượng và tổng tiền bill
        const staticBill = await Bill.aggregate([
            {
                $group: {
                    _id: null,
                    count: {$sum: 1},
                    total: { $sum: '$tongTien' }
                }
            }
        ])

        // Đếm số lượng và tổng tiền bill theo đơn vị
        const staticBillByFaculty = await Bill.aggregate([
            {
                $group: {
                    _id: '$donVi',
                    count: {$sum: 1},
                    total: { $sum: '$tongTien' }
                }
            }
        ])

        const faculties = await Faculty.find({}).sort({tenDonVi: 1})
        const countByFaculty = faculties.map(faculty => {
            const dataCount = staticBillByFaculty.find(x => x._id?.toString() == faculty._id)
            return {
                _id: faculty._id,
                tenDonVi: faculty.tenDonVi,
                count: dataCount ? dataCount.count : 0,
                total: dataCount ? dataCount.total : 0
            }
        })

        res.status(200).json({
            status: 'success',
            data: {
                countData: {
                    totalUnionsMembers,
                    totalPaid,
                    totalUnPaid
                },
                staticBill,
                staticBillByFaculty: countByFaculty
            }
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}


// Events

// Classes