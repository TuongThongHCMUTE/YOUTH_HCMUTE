const express = require('express')

const { verifyToken } = require('../middleware/verifyToken')
const { getAllEvents, createOneEvent, getOneEvent, searchAllEvents,
        updateOneEvent, deleteOneEvent, getAttendanceEvents, getEventsForSV5T,
        getMissingEventsInSV5T }
    = require('../controllers/eventController')

const { getAllAttendances, modifyAttendance, cancelRegisterAttendance, exportExcelAllAttendances }
    = require('../controllers/attendanceController')

const Router = express.Router()

Router.route('/').get(verifyToken, getAllEvents).post(verifyToken, createOneEvent)

Router.route('/tim-kiem').get(verifyToken, searchAllEvents)

Router.route('/tham-gia').get(verifyToken, getAttendanceEvents)

Router.route('/tham-gia/:maSoSV/:maTieuChi').get(getEventsForSV5T)

Router.route('/hoat-dong-con-thieu').get(verifyToken, getMissingEventsInSV5T)

Router.route('/:id').get(verifyToken, getOneEvent).put(verifyToken, updateOneEvent).delete(verifyToken, deleteOneEvent)

Router.route('/:id/attendances').get(verifyToken, getAllAttendances)

Router.route('/:id/attendances/xls').get(verifyToken, exportExcelAllAttendances)

Router.route('/:id/attendances/:maSoSV/:huy-dang-ky').put(verifyToken, cancelRegisterAttendance)

Router.route('/:id/attendances/:maSoSV/:type').put(verifyToken, modifyAttendance)


module.exports = Router