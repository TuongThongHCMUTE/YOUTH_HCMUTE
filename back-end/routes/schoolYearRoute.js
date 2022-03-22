const express = require('express')

const { getAllSchoolYears, createOneSchoolYear, getOneFacultyByMaNamHoc,
        getCurrentSchoolYear, updateOneSchoolYearByMaNamHoc, deleteOneSchoolYearByMaNamHoc }
    = require('../controllers/schoolYearController')

const Router = express.Router()

Router.route('/').get(getAllSchoolYears).post(createOneSchoolYear)

Router.route('/nam-hoc-hien-tai').get(getCurrentSchoolYear)

Router.route('/:maNamHoc').get(getOneFacultyByMaNamHoc).put(updateOneSchoolYearByMaNamHoc).delete(deleteOneSchoolYearByMaNamHoc)

module.exports = Router