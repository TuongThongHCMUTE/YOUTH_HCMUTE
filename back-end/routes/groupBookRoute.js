const express = require('express')

const { verifyToken } = require('../middleware/verifyToken')
const { getAllGroupBooks, createOneGroupBook, getOneGroupBook,
        updateOneGroupBook, deleteOneGroupBook }
    = require('../controllers/groupBookController')

const Router = express.Router()

Router.route('/').get(verifyToken, getAllGroupBooks).post(verifyToken, createOneGroupBook)

Router.route('/:id').get(verifyToken, getOneGroupBook).put(verifyToken, updateOneGroupBook).delete(verifyToken, deleteOneGroupBook)

module.exports = Router