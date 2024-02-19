const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const sequelize = require('./utils/database')
const app = express()
app.use(bodyParser.json())
app.use(express.json())
app.use(cors())

// routes
const userRoutes = require('./router/route')


// modals

//use
app.use('/api', userRoutes)


const server = http.createServer(app)





sequelize
    .sync()
    .then(() => {

        server.listen(4000, () => {
            console.log("server is connected succesfully")
        })
    })
    .catch((err) => {
        console.log(err)
    })

