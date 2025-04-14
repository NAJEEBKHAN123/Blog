const express = require('express')
const { createPost, getAllPosts, getPostById, updatePosts, deletePosts } = require('../controller/post.controller')
const verifyToken = require('../middleware/authMiddleware')

const router = express.Router()


router.post('/create', verifyToken, createPost);
router.get('/getPosts', verifyToken, getAllPosts)
router.get('/getPost/:id', verifyToken, getPostById)
router.put('/update/:id', verifyToken, updatePosts)
router.delete('/delete/:id', verifyToken, deletePosts)


module.exports = router