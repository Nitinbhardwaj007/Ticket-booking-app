const express = require('express')
const errorHandler = require('./middlewares/errorMiddleware')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(errorHandler)

module.exports = { app }
