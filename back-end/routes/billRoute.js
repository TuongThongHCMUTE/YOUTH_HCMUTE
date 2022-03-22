const express = require('express')

const { getAllBills, createOneBill, getOneBill,
        updateOneBill, deleteOneBill }
    = require('../controllers/billController')

const Router = express.Router()

Router.route('/').get(getAllBills).post(createOneBill)

Router.route('/:id').get(getOneBill).put(updateOneBill).delete(deleteOneBill)

module.exports = Router