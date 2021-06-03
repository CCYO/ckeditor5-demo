const bcrypt = require('bcrypt')
const { USER_MODEL } = require('../model/user')

const register = async (email, password) => {
    let user = await USER_MODEL.findOne({ email })
    if(user) return null
    let hash = await bcrypt.hash(password, 10)
    user = await new USER_MODEL({ email, password: hash})
    await user.save()
    user = await USER_MODEL.findOne({email})
    return user
}

module.exports = { register }