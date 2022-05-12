const express = require('express')

// Add controller to route
const { loginWithPassword, resetPassword} = require('../controllers/authController')

const Router = express.Router()

Router.route('/dang-nhap').post(loginWithPassword)

Router.route('/cap-lai-mat-khau').put(resetPassword)

module.exports = Router