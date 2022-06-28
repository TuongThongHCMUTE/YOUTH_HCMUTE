const express = require('express')

const { verifyToken } = require('../middleware/verifyToken')
const { getAllStudentBills }
    = require('../controllers/studentBillController')
const { uploadFile } = require('../configs/fileUpload')

const Router = express.Router()

Router.route('/').get(getAllStudentBills).put(verifyToken, uploadFile.single('file'), getAllStudentBills)

module.exports = Router