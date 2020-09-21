const { UPDATE_NEW_DATA, RECEIVE_NEW_DATA } = require('./constants')
/*
Author: chankruze (chankruze@geekofia.in)
Created: Mon Sep 21 2020 14:51:37 GMT+0530 (India Standard Time)

Copyright (c) Geekofia 2020 and beyond
*/

const mongoose = require('mongoose'),
    Match = require('./mongo/model/Match'),
    constants = require('./constants')

const initSocketIO = (server) => {
    const io = require('socket.io')(server)

    io.on('connection', (socket) => {
        // socket connected
        console.log(`[INFO] socket connected`)

        // listen for socket emit from admin
        socket.on(constants.RECEIVE_NEW_DATA, (args) => {
            console.log(`[INFO] socket emit received`)

            // broadcast to all connected clients (io emit)
            io.emit(constants.UPDATE_NEW_DATA, args)
            console.log(`[DEBUG START]`)
            console.log(args)
            console.log(`[DEBUG END]`)

            // update MongoDB
            Match.findOne({ tourneyId: constants.TOURNEY_ID }, (err, res) => {
                if (err) {
                    console.log(`[ERROR]`)
                    console.log(err)
                } else {
                    res.matchTitle = args.title
                    res.matchUrl = args.url
                    res.save()
                }
            })
        })

        // socket disconnected
        socket.on('disconnect', () => console.log(`[INFO] socket disconnected`))
    })
}

module.exports = initSocketIO
