const express = require('express')

const { verifyToken } = require('../middleware/verifyToken')
const { getAllStudentBills, importBillsOfStudents }
    = require('../controllers/studentBillController')
const { uploadFile } = require('../configs/fileUpload')

const Router = express.Router()

Router.route('/').get(verifyToken, getAllStudentBills)

Router.route('/nhap-du-lieu').post(verifyToken, uploadFile.single('file'), importBillsOfStudents)

module.exports = Router