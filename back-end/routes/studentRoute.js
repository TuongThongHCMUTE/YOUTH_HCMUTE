const express = require('express')

const { verifyToken } = require('../middleware/verifyToken')
const { getAllStudents, createOneStudent, getOneStudent, getStudentBarcode, getStudentInfo,
        updateOneStudent, deleteOneStudent, exportExcelAllStudents}
    = require('../controllers/studentController')

const Router = express.Router()

Router.route('/').get(verifyToken, getAllStudents).post(verifyToken, createOneStudent)

Router.route('/xls').get(verifyToken, exportExcelAllStudents)

Router.route('/thong-tin-barcode/:maSoSV').get(verifyToken, getStudentBarcode)

Router.route('/thong-tin/:maSoSV').get(verifyToken, getStudentInfo)

Router.route('/:id').get(verifyToken, getOneStudent).put(verifyToken, updateOneStudent).delete(verifyToken, deleteOneStudent)

module.exports = Router