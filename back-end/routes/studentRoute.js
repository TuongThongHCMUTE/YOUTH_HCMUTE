const express = require('express')

const { getAllStudents, createOneStudent, getOneStudent, getStudentBarcode, getStudentInfo,
        updateOneStudent, deleteOneStudent}
    = require('../controllers/studentController')

const Router = express.Router()

Router.route('/').get(getAllStudents).post(createOneStudent)

Router.route('/thong-tin-barcode/:maSoSV').get(getStudentBarcode)

Router.route('/thong-tin/:maSoSV').get(getStudentInfo)

Router.route('/:id').get(getOneStudent).put(updateOneStudent).delete(deleteOneStudent)

module.exports = Router