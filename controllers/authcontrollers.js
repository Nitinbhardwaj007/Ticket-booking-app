const User = require('../models/userModel')

const signup = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body

    if (!fullName || !email || !password) {
      res.status(400).json({ message: 'All Fields are required' })
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      res.status(409).json({ message: 'User is already register' })
    }
    const user = await User.create({
      fullName,
      email,
      password,
    })
    res.status(201).json({
      success: true,
      message: 'User created successfully',
    })
  } catch (error) {
    next(error)
  }
}
module.exports = signup
