const bcrypt = require('bcrypt')
const passport = require('passport')
const LocalStrategy = require('passport-local')

const { USER_MODEL } = require('../model/user')

passport.use(new LocalStrategy(
    {
        usernameField: 'email'
    },
    async (email, password, done) => {
        try {
            let user = await USER_MODEL.findOne( {email} )
            if (!user) return done(null, false, { type: 'alert_msg', message: '無此信箱' })
            if(await bcrypt.compare(password, user.password)){
                return done(null, user)
            }else {
                return done(null, false, { type: 'alert_msg', message: '密碼錯誤' })
            }
        } catch(err) {
            return done(err, false)
        }
    })
)

passport.serializeUser((user, done) => {
    done(null, {id: user.id, email: user.email})
})

passport.deserializeUser( async ({ id, email }, done) => {
    try {
        let user = await USER_MODEL.findById(id)
        if(!user) return done(null, false, { type: 'alert_msg', message: '登入已過期，請重新登入' })
        console.log(typeof user._id)
        done(null, user)
        // done(null, {id: user._id, email: user.email, password: user.password})
    } catch(err) {
        return done(err, false)
    }
})

module.exports = passport