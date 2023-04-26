const express = require('express')
//const path = require('path')
const cors = require('cors')


const db = require('../database/db')
const routes = require('../routes/routes')


const app = express()

db.connect()

app.use(express.json())

app.use(cors({
    origin: 'http://127.0.0.1:5500'
}))

app.use('/api', routes)



const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Server is listening on port ${port}`) )