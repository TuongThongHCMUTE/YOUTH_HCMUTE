const express = require('express')

// Add controller to route
const { loginWithPassword } = require('../controllers/authController')

const Router = express.Router()

Router.route('/login').post(loginWithPassword)

module.exports = Router