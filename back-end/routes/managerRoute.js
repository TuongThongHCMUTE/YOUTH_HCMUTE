const express = require('express')

const { getAllManagers, createOneManager, getOneManager,
        updateOneManager, deleteOneManager }
    = require('../controllers/managerController')

const Router = express.Router()

Router.route('/').get(getAllManagers).post(createOneManager)

Router.route('/:id').get(getOneManager).put(updateOneManager).delete(deleteOneManager)

module.exports = Router