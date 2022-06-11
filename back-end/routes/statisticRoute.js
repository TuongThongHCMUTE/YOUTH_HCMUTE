const express = require('express')

const { getDataForLandingPage, countStudentsByFaculty, countUserByRole}
    = require('../controllers/statisticController')

const Router = express.Router()

Router.route('/trang-chu').get(getDataForLandingPage)

Router.route('/sinh-vien-theo-don-vi').get(countStudentsByFaculty)

Router.route('/tai-khoan-theo-role').get(countUserByRole)

module.exports = Router