const Ticket = require('../models/ticket.model')

const createTicket = async (req, res, next) => {
  try {
    const ticket = await Ticket.create({
      title: req.body.title,
      description: req.body.description,
      createdBy: req.user.userId,
    })
    res.status(201).json({ success: true, ticket })
  } catch (err) {
    next(err)
  }
}

module.exports = { createTicket }
