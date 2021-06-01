const { join } = require('path')
const stream = require('stream')

const express = require('express')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const flash = require('connect-flash')

const reidsClient = require('../db/redis')

const vister_router = require('./router/vister')
const user_router = require('./router/user')

const { SESSION_SECRET } = require('./config/node')

const app = express()

app.set('view engine', 'ejs')

app.use(
    session({
        store: new RedisStore({ client: reidsClient }),
        secret: SESSION_SECRET,
        saveUninitialized: false,
        resave: false,
        cookie: {
            // 10 mins
            maxAge: 10 * 60 * 1000
        }
    })
)

// 來源：https://stackoverflow.com/questions/50988891/payloadtoolargeerror-with-limit-set
app.use(express.urlencoded({limit: '200mb', extended: true}));
app.use(express.json({limit: '200mb'}));

app.use('/', vister_router)

app.use('/user', user_router)

app.use(express.static( join(__dirname , "public")))

module.exports = app