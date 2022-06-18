const express = require('express')

const { verifyToken } = require('../middleware/verifyToken')
const { uploadAFile, getAFile, deleteAFile }
    = require('../controllers/fileController')
const { uploadFile } = require('../configs/fileUpload')

const Router = express.Router()

Router.route('/').get(getAFile).post(verifyToken, uploadFile.single('file'), uploadAFile).delete(deleteAFile)

module.exports = Router