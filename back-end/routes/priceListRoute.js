const express = require('express')

const { verifyToken } = require('../middleware/verifyToken')
const { getAllPriceLists, createOnePriceList, getOnePriceList,
        updateOnePriceList, deleteOnePriceList }
    = require('../controllers/priceListController')

const Router = express.Router()

Router.route('/').get(verifyToken, getAllPriceLists).post(verifyToken, createOnePriceList)

Router.route('/:id').get(verifyToken, getOnePriceList).put(verifyToken, updateOnePriceList).delete(verifyToken, deleteOnePriceList)

module.exports = Router