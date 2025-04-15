const express = require('express')
const { createPost, getAllPosts, getPostById, updatePosts, deletePosts } = require('../controller/post.controller')
const verifyToken = require('../middleware/authMiddleware')
const upload  = require('../middleware/upload')

const router = express.Router()


router.post('/create', verifyToken, upload.single('image'), createPost);

router.get('/getPosts', getAllPosts)
router.get('/getPost/:id', getPostById)
router.put('/update/:id', verifyToken, updatePosts)
router.delete('/delete/:id', verifyToken, deletePosts)


module.exports = router