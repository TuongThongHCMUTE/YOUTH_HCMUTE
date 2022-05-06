const express = require('express')

const { verifyToken } = require('../middleware/verifyToken')
const { getAllFaculties, createOneFaculty, getOneFaculty,
        updateOneFaculty, deleteOneFaculty }
    = require('../controllers/facultyController')

const Router = express.Router()

Router.route('/').get(verifyToken, getAllFaculties).post(verifyToken, createOneFaculty)

Router.route('/:id').get(verifyToken, getOneFaculty).put(verifyToken, updateOneFaculty).delete(verifyToken, deleteOneFaculty)

module.exports = Router