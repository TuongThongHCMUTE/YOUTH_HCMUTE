const Student = require('../models/student')
const Manager = require('../models/manager')
const Faculty = require('../models/faculty')
const Bill = require('../models/bill')
const Event = require('../models/event')
const Class = require('../models/class')

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
        const totalBills = await Student.countDocuments()
        const totalPaid = await Bill.countDocuments({trangThai: true})
        const totalUnPaid = totalBills - totalPaid

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
                    totalBills,
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
exports.statisticEvents = async (req, res, next) => {
    try {
        const totalEvents = await Event.countDocuments()
        const totalApprovedEvent = await Event.countDocuments({daDuyet: true})
        const totalUnApprovedEvent = totalEvents - totalApprovedEvent

        // Thống kê đăng ký
        let staticEvent = await Event.aggregate([
            { 
                $match: { /* Query can go here, if you want to filter results. */ }
            },
            {
                $project: {
                    count: {$sum: 1},
                    soLuongThamGia: {$size: '$sinhViens'},
                    quenLoiThamGia: '$quenLoiThamGia',
                    diemCong: '$diemCong'
                }
            }
        ])

        let calculateEvents = {
            'Tổng số': {
                count: 0,
                soLuongThamGia: 0,
                soDiemCong: 0
            }
        }

        staticEvent.forEach(x => {
            let right = x.quenLoiThamGia ? x.quenLoiThamGia : 'Chưa xác định'

            calculateEvents[right] = calculateEvents[right] ? calculateEvents[right] : {
                count: 0,
                soLuongThamGia: 0,
                soDiemCong: 0
            }

            calculateEvents[right].count += 1
            calculateEvents[right].soLuongThamGia += x.soLuongThamGia
            calculateEvents[right].soDiemCong += x.soLuongThamGia * x.diemCong

            calculateEvents['Tổng số'].count += 1
            calculateEvents['Tổng số'].soLuongThamGia += x.soLuongThamGia
            calculateEvents['Tổng số'].soDiemCong += x.soLuongThamGia * x.diemCong
        })

        let eventByRight = []
        Object.keys(calculateEvents).forEach(key => {
            eventByRight.push({
                ...calculateEvents[key],
                quenLoiThamGia: key
            })
        })

        res.status(200).json({
            status: 'success',
            data: {
                countData: {
                    totalEvents,
                    totalApprovedEvent,
                    totalUnApprovedEvent
                },
                eventByRight
            }
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

// Classes
exports.statisticClasses = async (req, res, next) => {
    try {
        // Đếm số lượng và tổng tiền lớp theo đơn vị
        const staticClassByFaculty = await Class.aggregate([
            {
                $group: {
                    _id: '$donVi',
                    count: {$sum: 1}
                }
            }
        ])

        const faculties = await Faculty.find({}).sort({tenDonVi: 1})
        const countByFaculty = faculties.map(faculty => {
            const dataCount = staticClassByFaculty.find(x => x._id?.toString() == faculty._id)
            return {
                _id: faculty._id,
                tenDonVi: faculty.tenDonVi,
                count: dataCount ? dataCount.count : 0
            }
        })

        // Đếm số lượng và tổng tiền lớp theo ngành học
        const staticClassByMajor = await Class.aggregate([
            {
                $group: {
                    _id: '$nganhHoc',
                    count: {$sum: 1}
                }
            }
        ])

        res.status(200).json({
            status: 'success',
            data: {
                staticBillByFaculty: countByFaculty,
                staticClassByMajor
            }
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

// Student Dashboard
exports.getDataForStudentDashboard = async (req, res, next) => {
    try {
        // const { email } = req.user
        const email = '18110234@student.hcmute.edu.vn'
        const maSoSV = email.slice(0, 8)

        if (!email.includes('@student.hcmute.edu.vn')) {
            const err = new Error('Không sử dụng tài khoản sinh viên')
            err.statusCode = 400
            return next(err)
        }
        
        // Student section
        const student = await Student.findOne({maSoSV})

        const dongDoanPhi = student.bills.find(x => x.trangThai == true) ? true : false
        const nopSoDoan = student?.thongTinDoanVien?.trangThaiSoDoan == 'DA_NOP' ? true : false


        // Event section
        const events = await Event.find({sinhViens:{$elemMatch:{maSoSV, hoanThanhHoatDong: true}}})
                                    .select('_id quenLoiThamGia diemCong')
        let diemCong = {}
        let idEvents = []
        events.forEach(event => {
            idEvents.push(event._id)

            if (!diemCong[event.quenLoiThamGia]) {
                diemCong[event.quenLoiThamGia] = event.diemCong
            } else {
                diemCong[event.quenLoiThamGia] += event.diemCong
            }
        })


        const recommendEvents = await Event.find({
                                                    _id: { $nin: idEvents},
                                                    daDuyet: true,
                                                    hienThi: true,
                                                    'thoiGianToChuc.thoiGianBatDau': {$gt: new Date()}
                                                }).select('tenHoatDong anhBia thoiGianDangKy thoiGianToChuc quenLoiThamGia diemCong')

        // Validate section
        
        res.status(200).json({
            status: 'success',
            data: {
                dongDoanPhi,
                nopSoDoan,
                diemRenLuyen : {
                    tongDiem: diemCong['Điểm rèn luyện'],
                    events: recommendEvents.filter(x => x.quenLoiThamGia == 'Điểm rèn luyện')
                },
                diemCTXH : {
                    tongDiem: diemCong['Điểm CTXH'],
                    events: recommendEvents.filter(x => x.quenLoiThamGia == 'Điểm CTXH')
                }
            }
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}