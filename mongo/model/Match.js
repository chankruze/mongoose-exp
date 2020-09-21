/*
Author: chankruze (chankruze@geekofia.in)
Created: Mon Sep 21 2020 14:15:47 GMT+0530 (India Standard Time)

Copyright (c) Geekofia 2020 and beyond
*/

const mongoose = require('mongoose'),
    constants = require('../../constants')

// match schema
const matchSchema = new mongoose.Schema({
    tourneyId : String,
    matchUrl : String,
    matchTitle: String
}) 

module.exports = mongoose.model('Match', matchSchema)
