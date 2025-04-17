const express = require('express')
const { createPost, getAllPosts, getPostById, updatePosts, deletePosts, SearchPostByTitle } = require('../controller/post.controller')
const verifyToken = require('../middleware/authMiddleware')
const upload = require('../middleware/upload')

const router = express.Router()

// Protected routes
router.post('/create', verifyToken, upload.single('image'), createPost);
router.put('/update/:id', verifyToken, updatePosts);
router.delete('/delete/:id', verifyToken, deletePosts);

// Public routes (if you want to protect these, add verifyToken)
router.get('/getPosts', getAllPosts)
router.get('/getPost/:id', getPostById)
router.get('/search', SearchPostByTitle)

module.exports = router
