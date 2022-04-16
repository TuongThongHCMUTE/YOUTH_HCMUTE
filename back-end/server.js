// Load environment variables from a .env file into process .env
require('dotenv').config()

// Connect DB
const {connectDB} = require('./configs/db')

// Call connectDB
connectDB()

const express = require('express')

// CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options
const cors = require('cors')

// Connect to routers from in Routes
const authRoute = require('./routes/authRoute')
const billRoute = require('./routes/billRoute')
const classRoute = require('./routes/classRoute')
const facultyRoute = require('./routes/facultyRoute')
const managerRoute = require('./routes/managerRoute')
const priceListRoute = require('./routes/priceListRoute')
const schoolYearRoute = require('./routes/schoolYearRoute')
const studentRoute = require('./routes/studentRoute')

const processData = require('./routes/processDataRoute')


// Import error handler, must after Routers
const {errorHandler} = require('./middleware/errorHandler')

// Crate app express
const app = express()
app.use(cors()) // Cors
app.use(express.json()) // Body parse. It parses incoming requests with JSON payloads and is based on body-parser

// Mount the route, connect route with server
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/bills/', billRoute)
app.use('/api/v1/classes/', classRoute)
app.use('/api/v1/faculties/', facultyRoute)
app.use('/api/v1/managers/', managerRoute)
app.use('/api/v1/price-lists', priceListRoute)
app.use('/api/v1/school-years/', schoolYearRoute)
app.use('/api/v1/students/', studentRoute)

app.use('/api/v1/process-data', processData)

app.get('/', (req, res, next) => {
    res.status(200).json({
        status: 'success',
        message: 'Backend website YOUTH HCMUTE'
    })
})

// Unhandled Route
// '*' access into all routes
app.all('*', (req, res, next) => {
    const err = new Error('The route can not be found!')
    err.statusCode = 404
    next(err)
})

// Use error handler, must after Routes
app.use(errorHandler)

// Open port
port = process.env.PORT || process.env.APP_PORT

app.listen(port, () => {
    console.log(`Server in running on port ${port}`)
})