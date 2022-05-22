const express = require('express')

const { verifyToken } = require('../middleware/verifyToken')
const { getAllManagers, createOneManager, getOneManager,
        updateOneManager, deleteOneManager }
    = require('../controllers/managerController')

const Router = express.Router()

Router.route('/').get(verifyToken, getAllManagers).post(verifyToken, createOneManager)

Router.route('/:id').get(verifyToken, getOneManager).put(verifyToken, updateOneManager).delete(verifyToken, deleteOneManager)

module.exports = Router