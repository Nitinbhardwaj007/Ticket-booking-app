const Ticket = require('../models/ticket.model')

const createTicket = async (req, res, next) => {
  try {
    const { title, description } = req.body
    if (!title) {
      return res.status(400).json({ message: 'Title is required' })
    }
    const ticket = await Ticket.create({
      title,
      description,
      createdBy: req.user.userId,
    })
    res.status(201).json({ success: true, ticket })
  } catch (err) {
    next(err)
  }
}

const getTickets = async (req, res, next) => {
  try {
    let tickets
    if (req.user.role === 'admin') {
      tickets = await Ticket.find()
    } else {
      tickets = await Ticket.find({ createdBy: req.user.userId }).sort({
        createdAt: -1,
      })
    }
    res.status(200).json({ success: true, tickets })
  } catch (err) {
    next(err)
  }
}
const updateTicket = async (req, res, next) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' })
    }

    // Ownership / authorization check
    if (
      ticket.createdBy.toString() !== req.user.userId &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ message: 'Forbidden' })
    }

    // ✅ SAFE FIELD UPDATES (WHITELIST)
    const { title, description, status } = req.body

    if (title !== undefined) ticket.title = title
    if (description !== undefined) ticket.description = description
    if (status !== undefined) ticket.status = status

    await ticket.save()

    res.status(200).json({ success: true, ticket })
  } catch (err) {
    next(err)
  }
}

const deleteTicket = async (req, res, next) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' })

    if (
      ticket.createdBy.toString() !== req.user.userId &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ message: 'Forbidden' })
    }

    await ticket.deleteOne()

    res.status(200).json({ success: true, message: 'Ticket deleted' })
  } catch (err) {
    next(err)
  }
}
const getTicketById = async (req, res, next) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' })

    if (
      ticket.createdBy.toString() !== req.user.userId &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ message: 'Forbidden' })
    }

    res.status(200).json({ success: true, ticket })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  createTicket,
  updateTicket,
  deleteTicket,
  getTickets,
  getTicketById,
}
