const { getQueryParameter, updateValues, populateFields, exportExcel } = require('../common/index')
const excelController = require('../common/xls/attendancesXls')

const { Attendance } = require('../models/attendance')
const Student = require('../models/student')
const Event = require('../models/event')

const checkCompleteEvent = (dieuKiens, attendance) => {
    if (dieuKiens.length == 0) {
        dieuKiens.push('diemDanhVao')
    }

    let hoanThanhHoatDong = true
    dieuKiens.forEach(dieuKien => {
        if (attendance[dieuKien] == false) {
            hoanThanhHoatDong = false
            return hoanThanhHoatDong
        }
    })

    return hoanThanhHoatDong
}

// Attendances
exports.getAllAttendances = async (req, res, next) => {
    try {
        const { id } = req.params
        const { sort, limit, skip, query } = getQueryParameter(req)

        const event = await Event.findById(id)
                                    .populate(populateFields['attendance'])

        res.status(200).json({
            status: 'success',
            all: event.sinhViens.length,
            results: event.sinhViens.length,
            data: {
                attendances: event.sinhViens,
                event: {
                    soLuongSinhVien: event.soLuongSinhVien,
                    soLuongSinhVienDangKy: event.soLuongSinhVienDangKy,
                    soLuongSinhVienThamGia: event.soLuongSinhVienThamGia
                }            
            }
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

// Attendances
exports.exportExcelAllAttendances = async (req, res, next) => {
    try {
        const { id } = req.params

        const event = await Event.findById(id)
                                    .populate(populateFields['attendance'])

        const { columns, data } = excelController.getXlsForAttendances(event.sinhViens)
        return exportExcel('Attendances', columns, data, res)
    } catch (e) {
        console.log(e)
        next(e)
    }
}

// Attendance
exports.modifyAttendance = async (req, res, next) => {
    try {
        const { id, maSoSV, type } = req.params

        const student = await Student.findOne({maSoSV})

        if (student) {
            let event = await Event.findById(id).select('soLuongSinhVienDangKy soLuongSinhVien dieuKienHoanThanhs').select({ sinhViens: {$elemMatch: {maSoSV}}})
            let attendance = event.sinhViens[0]
            let dieuKienHoanThanhs = event.dieuKienHoanThanhs

            if(!attendance) {
                if (event.soLuongSinhVien && type == 'dang-ky' && event.soLuongSinhVienDangKy >= event.soLuongSinhVien) {
                    const err = new Error('Đã đủ số lượng đăng ký')
                    err.statusCode = 406
                    return next(err)
                }

                attendance = new Attendance({
                    sinhVien: student._id,
                    maSoSV,
                    createBy: req.user.email,
                    ...updateValues(type)
                })
                attendance.hoanThanhHoatDong = checkCompleteEvent(dieuKienHoanThanhs, attendance)

                event = await Event.findByIdAndUpdate(id, { $push: { sinhViens: attendance } }, {new: true, runValidators: true})
                                        .select('soLuongSinhVien, sinhViens')
                                        .populate(populateFields['attendance'])
            } else {
                attendance = Object.assign(attendance, updateValues(type))
                attendance.updateBy = req.user.email
                attendance.hoanThanhHoatDong = checkCompleteEvent(dieuKienHoanThanhs, attendance)

                let setValue = { $set: {} }
                Object.keys(JSON.parse(JSON.stringify(attendance))).forEach(key => {
                    setValue['$set'][`sinhViens.$.${key}`] = attendance[key]
                })

                event = await Event.findOneAndUpdate({_id: id, "sinhViens._id": attendance._id}, setValue, {new: true, runValidators: true})
                                        .select('soLuongSinhVien, sinhViens')
                                        .populate(populateFields['attendance'])
            }

            event.soLuongSinhVienDangKy = event.sinhViens.filter(x => x.dangKyThamGia == true).length
            event.soLuongSinhVienThamGia = event.sinhViens.filter(x => x.diemDanhVao == true).length
            event.save()

            res.status(200).json({
                status: 'success',
                data: {
                    event: {
                        soLuongSinhVien: event.soLuongSinhVien,
                        soLuongSinhVienDangKy: event.soLuongSinhVienDangKy,
                        soLuongSinhVienThamGia: event.soLuongSinhVienThamGia
                    },
                    attendance: event.sinhViens.find(x => x.maSoSV == maSoSV)
                }
            })
        } else {
            const err = new Error('Đoàn viên không tồn tại')
            err.statusCode = 404
            return next(err)
        }

    } catch (e) {
        console.log(e)
        next(e)
    }
}

// Huy dang ky
exports.cancelRegisterAttendance = async (req, res, next) => {
    try {
        const { id, maSoSV } = req.params

        const student = await Student.findOne({maSoSV})

        if (student) {
            let event = await Event.findById(id)
            let attendance = event.sinhViens.find(x => x.maSoSV == maSoSV)

            if(!attendance) {
                const err = new Error('Bạn chưa đăng ký')
                err.statusCode = 404
                return next(err)

            } else {
                if (attendance.diemDanhVao || attendance.diemDanhRa) {
                    const err = new Error('Hoạt động đã điểm danh không thể hủy đăng ký')
                    err.statusCode = 405
                    return next(err)
                }

                event = await Event.findOneAndUpdate({_id: id}, { $pull: { sinhViens: {_id: attendance._id.toString()}}})
            }

            event.soLuongSinhVienDangKy = event.sinhViens.filter(x => x.dangKyThamGia == true && x.maSoSV != maSoSV).length
            event.soLuongSinhVienThamGia = event.sinhViens.filter(x => x.diemDanhVao == true).length
            event.save()

            res.status(200).json({
                status: 'success',
                message: 'Hủy đăng ký thành công',
                data: {
                    event: {
                        soLuongSinhVien: event.soLuongSinhVien,
                        soLuongSinhVienDangKy: event.soLuongSinhVienDangKy,
                        soLuongSinhVienThamGia: event.soLuongSinhVienThamGia
                    },
                    attendance: event.sinhViens.find(x => x.maSoSV == maSoSV)
                }
            })
        } else {
            const err = new Error('Đoàn viên không tồn tại')
            err.statusCode = 404
            return next(err)
        }

    } catch (e) {
        console.log(e)
        next(e)
    }
}