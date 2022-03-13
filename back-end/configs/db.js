const mongoose = require('mongoose')

// Connect to database
const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.DB_URI, {
            // Avoid alert warning
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        console.log('DB connect successfully')
    } catch (e) {
        console.log(e)
        process.exit(1)
    }
}

module.exports = {connectDB}