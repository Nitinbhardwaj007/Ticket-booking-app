const express = require('express')
const { createTicket } = require('../controllers/ticket.controller')
const authMiddleware = require('../middlewares/auth.middleware')

const router = express.Router()

router.post('/', authMiddleware, createTicket)

module.exports = router
