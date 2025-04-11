const express = require('express')
const { getAllUsers, getUserById, updateUser, deleteUser } = require('../controller/user.controller')
const router = express.Router()


router.get('/getUsers', getAllUsers);
router.get('/getUsers', getUserById);
router.put('/getUsers', updateUser);
router.delete('/getUsers', deleteUser);



module.exports = router