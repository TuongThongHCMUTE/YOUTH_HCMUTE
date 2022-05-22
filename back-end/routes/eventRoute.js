const express = require('express')

const { verifyToken } = require('../middleware/verifyToken')
const { getAllEvents, createOneEvent, getOneEvent,
        updateOneEvent, deleteOneEvent }
    = require('../controllers/eventController')

const Router = express.Router()

Router.route('/').get(verifyToken, getAllEvents).post(verifyToken, createOneEvent)

Router.route('/:id').get(verifyToken, getOneEvent).put(verifyToken, updateOneEvent).delete(verifyToken, deleteOneEvent)

module.exports = Router