const express = require('express')

const { verifyToken } = require('../middleware/verifyToken')
const { loginWithPassword, loginWithGoogle, resetPassword, getCurrentUser,
        changePassword, updateCurrentUser}
    = require('../controllers/authController')

const Router = express.Router()

Router.route('/dang-nhap').post(loginWithPassword)

Router.route('/dang-nhap-google').post(loginWithGoogle)

Router.route('/cap-lai-mat-khau').put(resetPassword)

Router.route('/ca-nhan').get(verifyToken, getCurrentUser).put(verifyToken, updateCurrentUser)

Router.route('/doi-mat-khau').put(verifyToken, changePassword)

module.exports = Router