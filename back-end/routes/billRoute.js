const express = require('express')

const { getAllBills, createOneBill, getOneBill,
        updateOneBill, deleteOneBill, checkOutBill, updateMany}
    = require('../controllers/billController')

const Router = express.Router()

Router.route('/').get(getAllBills).post(createOneBill)

Router.route('/thanh-toan/:id').put(checkOutBill)

Router.route('/:id').get(getOneBill).put(updateOneBill).delete(deleteOneBill)

module.exports = Router