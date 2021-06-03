let router = require('express').Router()

const { v4: uuidv4 } = require('uuid')

const admin = require('../config/firebase-admin')

const passport = require('../middleware/passport')
const isAuthenticated = require('../middleware/isAuthenticated')

const {USER_MODEL} = require('../model/user')
const {BLOG_MODEL} = require('../model/blog')

const { saveBlog } = require('../controller/blog')

router.use( isAuthenticated )

router.get('/blog', async (req, res) => {
    // 文章列表、訪問登入/註冊頁
    let blogs = await BLOG_MODEL.find({email: req.user.email})
    console.log('blogs ==> ', blogs)
    return res.render('index', {
        alert_msg: req.flash('alert_msg'),
        login: req.isAuthenticated(),
        email: req.user.email,
        id: req.user.id,
        blogs
    })
})

router.post('/blog', (req, res) => {
    // 新增文章
    
})

router.patch('/blog', (req, res) => {
    // 更新文章
})

router.delete('/blog/:id', (req, res) => {
    // 刪除指定文章
})

router.use((err, req, res, next) => {
    // 錯誤處理
})

module.exports = router