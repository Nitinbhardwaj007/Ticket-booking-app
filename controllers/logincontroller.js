const User = require('../models/userModel')

const login = async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400).json({ message: 'All fields are necessary' })
  }

  const user = await User.findOne({ email })
  if (!user) {
    res.status(401).json({ message: 'Invalid credentials' })
  }

  const isMatched = await user.comparePassword(password)
  if (!isMatched) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }
  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  )

  res.status(200).json({
    success: true,
    token,
  })
}

module.exports = login
