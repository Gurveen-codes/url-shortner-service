import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import connectDB from './dbConfig.js'
import indexRouter from './routes/index.js'
import urlRouter from './routes/url.js'
import errorHandler from './middleware/errorHandler.js'

const app = express()
//Enable enviromental variables use
dotenv.config()
const PORT = process.env.PORT

//Connect to database
connectDB()

//Add Middleware to accept JSON data
app.use(express.json({ extended: false }))
//Morgan Middleware to log requests to console
app.use(morgan('dev'))

//Define routes
app.use('/', indexRouter)
app.use('/api/url', urlRouter)

//Add Error handler middleware
app.use(errorHandler)

//Start the server
app.listen(PORT, () => {
	console.log(`Server is running on port:${PORT}`.yellow.bold)
})
