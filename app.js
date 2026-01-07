const express = require('express')
const errorHandler = require('./middlewares/errorMiddleware')
const authrouter = require('./routers/authrouter')
const userrouter = require('./routers/userrouter')
const ticketrouter = require('./routers/ticketrouter')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(errorHandler)
app.use('/api/auth', authrouter)
app.use('/api/users', userrouter)
app.use('/api/ticket', ticketrouter)

module.exports = { app }
