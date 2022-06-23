const express = require('express');

const {verifyToken} = require('../middleware/verifyToken')
const {getAllNotifications, createOneNotification, getOneNotification,
        updateOneNotification, deleteOneNotification} = require('../controllers/notificationController')

const Router = express.Router();

//Lay toan bo
// Befor create post need to verify token
Router.route('/').get(verifyToken, getAllNotifications).post(verifyToken, createOneNotification);

//Truyen vao id
Router.route('/:id').get(verifyToken, getOneNotification).put(verifyToken, updateOneNotification).delete(verifyToken, deleteOneNotification);

module.exports = Router;