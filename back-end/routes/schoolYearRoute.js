const express = require('express')

const { verifyToken } = require('../middleware/verifyToken')
const { getAllSchoolYears, createOneSchoolYear, getOneFacultyByMaNamHoc,
        getCurrentSchoolYear, updateOneSchoolYearByMaNamHoc, deleteOneSchoolYearByMaNamHoc }
    = require('../controllers/schoolYearController')

const Router = express.Router()

Router.route('/').get(verifyToken, getAllSchoolYears).post(verifyToken, createOneSchoolYear)

Router.route('/nam-hoc-hien-tai').get(verifyToken, getCurrentSchoolYear)

Router.route('/:maNamHoc').get(verifyToken, getOneFacultyByMaNamHoc).put(verifyToken, updateOneSchoolYearByMaNamHoc).delete(verifyToken, deleteOneSchoolYearByMaNamHoc)

module.exports = Router