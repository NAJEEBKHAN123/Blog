const express = require('express')
const verifyToken = require('../middleware/authMiddleware')
const { addComment, getCommentsByPost, deleteComments } = require('../controller/comment.controller')

const router = express.Router()


router.post('/:postId',verifyToken, addComment)
router.get('/:postId', getCommentsByPost)
router.delete('/delete/:id',verifyToken, deleteComments)





module.exports = router