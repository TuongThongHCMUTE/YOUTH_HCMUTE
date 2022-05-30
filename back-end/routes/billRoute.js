const express = require('express')

const { verifyToken } = require('../middleware/verifyToken')
const { getAllBills, createOneBill, getOneBill, updateOneBill, deleteOneBill, checkOutBill,
        getKPIValuesByCheckoutDate, cancelPayment, exportExcelAllBills}
    = require('../controllers/billController')

const Router = express.Router()

Router.route('/').get(verifyToken, getAllBills).post(verifyToken, createOneBill)

Router.route('/xls').get(verifyToken, exportExcelAllBills)

Router.route('/thong-ke-theo-ngay').get(verifyToken, getKPIValuesByCheckoutDate)

Router.route('/thanh-toan/:id').put(verifyToken, checkOutBill)

Router.route('/huy-thanh-toan/:id').put(verifyToken, cancelPayment)

Router.route('/:id').get(verifyToken, getOneBill).put(verifyToken, updateOneBill).delete(verifyToken, deleteOneBill)

module.exports = Router