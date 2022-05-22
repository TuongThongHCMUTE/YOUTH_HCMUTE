const express = require('express')

const { getDataForLandingPage }
    = require('../controllers/statisticController')

const Router = express.Router()

Router.route('/trang-chu').get(getDataForLandingPage)

module.exports = Router