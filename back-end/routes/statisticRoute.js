const express = require('express')

const { verifyToken } = require('../middleware/verifyToken')
const { getDataForLandingPage, countStudentsByFaculty, countUserByRole, 
        statisticStudents, statisticBills, statisticEvents, statisticClasses,
        getDataForStudentDashboard }
    = require('../controllers/statisticController')

const Router = express.Router()

Router.route('/trang-chu').get(getDataForLandingPage)

Router.route('/sinh-vien').get(statisticStudents)

Router.route('/hoa-don').get(statisticBills)

Router.route('/hoat-dong').get(statisticEvents)

Router.route('/chi-doan').get(statisticClasses)

Router.route('/sinh-vien-theo-don-vi').get(countStudentsByFaculty)

Router.route('/tai-khoan-theo-role').get(countUserByRole)

Router.route('/dashboard-sinh-vien').get(verifyToken, getDataForStudentDashboard)

module.exports = Router