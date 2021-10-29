const express = require('express')
const router = express.Router()
const { addUsers, getUser, getUsers, updateUser, deleteUser } = require('../controllers/user')

// Route
router.post('/users', addUsers)
router.get('/users', getUsers)
router.get('/user/:id', getUser)
router.put('/user/:id', updateUser)
router.delete('/user/:id', deleteUser)

module.exports = router;