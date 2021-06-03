const { join } = require('path')
const stream = require('stream')

const express = require('express')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const flash = require('connect-flash')

require('./db/mongoose')
const reidsClient = require('./db/redis')

const vister_router = require('./router/vister')
const user_router = require('./router/user')

const passport = require('./middleware/passport')

const { SESSION_SECRET } = require('./config/node')

const app = express()

app.set('view engine', 'ejs')

app.use(flash())

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

app.use(passport.initialize())

app.use((req,res, next) => {
    console.log('passport.initial ==> ')
    console.log('req.session ==> ', req.session)
    console.log('================================')
    next()
})

// 來源：https://stackoverflow.com/questions/50988891/payloadtoolargeerror-with-limit-set
app.use(express.urlencoded({limit: '200mb', extended: true}));
app.use(express.json({limit: '200mb'}));

app.use('/', vister_router)

app.use(passport.session())

app.use((req,res, next) => {
    console.log('passport.session ==> ')
    console.log('req.session ==> ', req.session)
    console.log('================================')
    next()
})

app.use('/user', user_router)

app.use(express.static( join(__dirname , "public")))

module.exports = app