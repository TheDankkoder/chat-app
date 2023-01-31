const express = require('express')
const mongoose = require('mongoose')
const url = "mongodb://127.0.0.1:27017/local"

const app = express()

mongoose.connect(url, {useNewUrlParser:true})
const con = mongoose.connection

con.on('open', () => {
    console.log('connected...')
})

app.use(express.json())

const router = require('./routes/routes.js')
app.use('/',router)

app.listen(9000, () => {
    console.log('Server started')
})