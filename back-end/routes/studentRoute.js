const express = require('express')

const { getAllStudents, createOneStudent, getOneStudent, getStudentInfo,
        updateOneStudent, deleteOneStudent}
    = require('../controllers/studentController')

const Router = express.Router()

Router.route('/').get(getAllStudents).post(createOneStudent)

Router.route('/thong-tin-sinh-vien/:maSoSV').get(getStudentInfo)

Router.route('/:id').get(getOneStudent).put(updateOneStudent).delete(deleteOneStudent)

module.exports = Router