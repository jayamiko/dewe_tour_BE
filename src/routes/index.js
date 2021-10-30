const express = require('express')
const router = express.Router()
const { addUsers, getUser, getUsers, updateUser, deleteUser } = require('../controllers/user')
const { addCountry, getCountries, getCountry, updateCountry, deleteCountry } = require('../controllers/country')
const { addTrip, getTrips, getTrip, updateTrip, deleteTrip } = require('../controllers/trip')
const { addTransaction, getTransactions, getTransaction, updateTransaction, deleteTransaction } = require('../controllers/transaction')

// Route User
router.get('/users', getUsers)
router.get('/user/:id', getUser)
router.post('/users', addUsers)
router.put('/user/:id', updateUser)
router.delete('/user/:id', deleteUser)

// Route Countries
router.get('/countries', getCountries)
router.get('/countries/:id', getCountry)
router.post('/countries', addCountry)
router.put('/countries/:id', updateCountry)
router.delete('/countries/:id', deleteCountry)

// Route Trips
router.get('/trips', getTrips)
router.get('/trip/:id', getTrip)
router.post('/trip', addTrip)
router.put('/trip/:id', updateTrip)
router.delete('/trip/:id', deleteTrip)

// Route Transaction
router.get('/transactions', getTransactions)
router.get('/transaction/:id', getTransaction)
router.post('/transaction', addTransaction)
router.put('/transaction/:id', updateTransaction)
router.delete('/transaction/:id', deleteTransaction)

module.exports = router;