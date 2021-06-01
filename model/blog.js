const mongoose = require('mongoose')

const BLOG_SCHEMA = new mongoose.Schema({
    email: { type: String, require: true},
    title: { type: String, required: true },
    html: { type: String, required: true }
})

// 創建 collection, 在 mongodb 此 collection 會被自動命名為 Users
const BLOG_MODEL = mongoose.model("Blog", BLOG_SCHEMA)

module.exports = {
    BLOG_MODEL
}