const dotenv = require('dotenv')
const { app } = require('./app.js')
const connectDb = require('./config/db.js')

dotenv.config({
  path: './.env',
})

connectDb()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port ${process.env.PORT}`)
    })
  })
  .catch((error) => {
    console.log(`MONGO DB Connection failed !!!:`, error)
  })
