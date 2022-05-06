const express = require('express')

const { verifyToken } = require('../middleware/verifyToken')
const { getAllClasses, createOneClass, getOneClass,
        updateOneClass, deleteOneClass }
    = require('../controllers/classController')

const Router = express.Router()

Router.route('/').get(verifyToken, getAllClasses).post(verifyToken, createOneClass)

Router.route('/:id').get(verifyToken, getOneClass).put(verifyToken, updateOneClass).delete(verifyToken, deleteOneClass)

module.exports = Router