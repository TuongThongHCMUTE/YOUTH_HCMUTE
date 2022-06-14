const express = require('express');

const {verifyToken} = require('../middleware/verifyToken')
const {getAllComments, createOneComment, getOneComment,
        updateOneComment, deleteOneComment} = require('../controllers/commentController')

const Router = express.Router();

//Lay toan bo
// Befor create post need to verify token
Router.route('/').get(verifyToken, getAllComments).post(verifyToken, createOneComment);

//Truyen vao id
Router.route('/:id').get(verifyToken, getOneComment).put(verifyToken, updateOneComment).delete(verifyToken, deleteOneComment);

module.exports = Router;