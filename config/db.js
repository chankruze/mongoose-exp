/*
Author: chankruze (chankruze@geekofia.in)
Created: Mon Sep 21 2020 14:35:05 GMT+0530 (India Standard Time)

Copyright (c) Geekofia 2020 and beyond
*/

const mongoose = require('mongoose')
const config = require('config')
const url = config.get('MONGO_ATLAS_URI')

const connectMongoDB = async () => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log(`[INFO] MongoDB connected`)
    } catch (err) {
        console.error(err.message)
        process.exit(1)
    }
}

module.exports = connectMongoDB
