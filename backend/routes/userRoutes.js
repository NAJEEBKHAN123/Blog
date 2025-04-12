const express = require('express')
const { getAllUsers, getUserById, updateUser, deleteUser } = require('../controller/user.controller');
const verifyToken = require('../middleware/authMiddleware');
const router = express.Router()


router.get('/', verifyToken, getAllUsers);
router.get('/:id', verifyToken, getUserById);
router.put('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id',verifyToken, deleteUser);



module.exports = router