/*
Author: chankruze (chankruze@geekofia.in)
Created: Mon Sep 21 2020 13:43:56 GMT+0530 (India Standard Time)

Copyright (c) Geekofia 2020 and beyond
*/

const express = require('express'),
    cors = require('cors'),
    os = require('os'),
    path = require('path'),
    config = require('config'),
    connectMongoDB = require('./config/db'),
    initSocketIO = require('./socketHandler')

// init express app 
const app = express()
// CORS
app.use(cors())

// use static to render html
app.use(express.static('public'))

// connect Mongo DB
connectMongoDB()

// routes
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

// port
const PORT = process.env.PORT || config.get('PORT')
// network interfaces of os
const netInterfaces = os.networkInterfaces()
// public server url on network
const SERVER_URL_NETWORK = netInterfaces.eth0[0].address

// create http server instance
const server = app.listen(PORT, () => {
    console.log(`[INFO][SERVER URL LOCAL]   ==> http://localhost:${PORT}`)
    console.log(`[INFO][SERVER URL NETWORK] ==> http://${SERVER_URL_NETWORK}:${PORT}`)
})

initSocketIO(server)
