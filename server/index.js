const express = require('express')
const cors = require('cors')
const mongodb = require('mongoose')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const router = require('./routes/index')
const errorMiddleware = require('./middleware/error-middleware')

const PORT = process.env.PORT || 5000

const server = express()

server.use(cors({
	credentials: true,
	origin: process.env.CLIENT_URL
}))
      .use(express.json())
      .use(cookieParser())
      .use('/api', router)
      .use(errorMiddleware)

const start = async () => {
    await mongodb.connect(process.env.DB_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    },() => {
        console.log('Connected to MongoDB')
    })
    server.listen(PORT, () => {
        console.log(`Server started, port: ${PORT}`)
    })
}

start()


