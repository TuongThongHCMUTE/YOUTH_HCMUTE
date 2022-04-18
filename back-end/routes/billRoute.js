const express = require('express')

const { getAllBills, createOneBill, getOneBill, updateOneBill, deleteOneBill, checkOutBill,
        getKPIValuesByCheckoutDate, cancelPayment}
    = require('../controllers/billController')

const Router = express.Router()

Router.route('/').get(getAllBills).post(createOneBill)

Router.route('/thong-ke-theo-ngay').get(getKPIValuesByCheckoutDate)

Router.route('/thanh-toan/:id').put(checkOutBill)

Router.route('/huy-thanh-toan/:id').put(cancelPayment)

Router.route('/:id').get(getOneBill).put(updateOneBill).delete(deleteOneBill)

module.exports = Router