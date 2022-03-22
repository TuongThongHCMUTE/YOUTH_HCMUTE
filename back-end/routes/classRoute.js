const express = require('express')

const { getAllClasses, createOneClass, getOneClass,
        updateOneClass, deleteOneClass }
    = require('../controllers/classController')

const Router = express.Router()

Router.route('/').get(getAllClasses).post(createOneClass)

Router.route('/:id').get(getOneClass).put(updateOneClass).delete(deleteOneClass)

module.exports = Router