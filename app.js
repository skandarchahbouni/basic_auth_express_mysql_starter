require('dotenv').config()
const express = require("express")
const cors = require('cors')
const cookieParser = require('cookie-parser')
const authRouter = require('./routes/auth')
const errorHandler = require('./middlewares/error_handler')
const notFound = require('./middlewares/not_found')


const app = express()

const corsConfig = {
    credentials: true,
    origin: true,
}


app.use('/static/images',express.static(__dirname + '/static/images'));
app.use(cors(corsConfig))

app.use(express.json())
app.use(cookieParser())


// Routes 
app.use('/api/auth', authRouter)
app.use(errorHandler)
app.use(notFound)

const port = process.env.PORT || 8080
const start = () => {
    try {
        app.listen(port)
        console.log(`Server is running on port ${port}`)
    } catch (error) {
        console.log("Server is not listening")
    }
}

start()