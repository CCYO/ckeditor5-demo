const mongoose = require('mongoose')

const USER_SCHEMA = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
})

// 創建 collection, 在 mongodb 此 collection 會被自動命名為 Users
const USER_MODEL = mongoose.model("User", USER_SCHEMA)

module.exports = {
    USER_MODEL
}