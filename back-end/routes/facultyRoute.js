const express = require('express')

const { getAllFaculties, createOneFaculty, getOneFaculty,
        updateOneFaculty, deleteOneFaculty }
    = require('../controllers/facultyController')

const Router = express.Router()

Router.route('/').get(getAllFaculties).post(createOneFaculty)

Router.route('/:id').get(getOneFaculty).put(updateOneFaculty).delete(deleteOneFaculty)

module.exports = Router