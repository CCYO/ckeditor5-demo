let router = require('express').Router()

const { v4: uuidv4 } = require('uuid')

const admin = require('../config/firebase-admin')

const {USER_MODEL} = require('../model/user')
const {BLOG_MODEL} = require('./model/blog')

router.get('/blog', (req, res) => {
    // 文章列表、訪問登入/註冊頁
    // res.render('index')
})

router.post('/blog', (req, res) => {
    // 新增文章
})

router.update('/blog', (req, res) => {
    // 更新文章
})

router.delete('/blog/:id', (req, res) => {
    // 刪除指定文章
})

router.use((err, req, res, next) => {
    // 錯誤處理
})

module.exports = router