const mongoose = require('mongoose')

const { mongodb } = require('../config/db')

mongoose.connect(mongodb.url, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection;
db.on('connected', () => console.log('mongoose connect OK!'))
db.on('error', () => console.log('mongoose connect Fail ==> ', err))