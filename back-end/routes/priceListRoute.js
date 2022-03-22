const express = require('express')

const { getAllPriceLists, createOnePriceList, getOnePriceList,
        updateOnePriceList, deleteOnePriceList }
    = require('../controllers/priceListController')

const Router = express.Router()

Router.route('/').get(getAllPriceLists).post(createOnePriceList)

Router.route('/:id').get(getOnePriceList).put(updateOnePriceList).delete(deleteOnePriceList)

module.exports = Router