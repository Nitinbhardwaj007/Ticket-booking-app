const express = require('express')
const {
  createTicket,
  getTickets,
  updateTicket,
  deleteTicket,
  getTicketById,
} = require('../controllers/ticket.controller')
const authMiddleware = require('../middlewares/auth.middleware')

const router = express.Router()

router.post('/', authMiddleware, createTicket)
router.get('/', authMiddleware, getTickets)
router.put('/:id', authMiddleware, updateTicket)
router.delete('/:id', authMiddleware, deleteTicket)
router.get('/:id', authMiddleware, getTicketById)

module.exports = router
