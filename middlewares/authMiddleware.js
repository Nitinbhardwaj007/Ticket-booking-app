const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    const err = new Error('Authentication required')
    err.statusCode = 401
    return next(err)
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    const err = new Error('Invalid or expired token')
    err.statusCode = 401
    return next(err)
  }
}

module.exports = authMiddleware
