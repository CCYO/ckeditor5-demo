let router = require('express').Router()

const passport = require('../middleware/passport')

const { USER_MODEL } = require('../model/user')
const { BLOG_MODEL }  = require('../model/blog')
const { SuccessModel } = require('../model/resModel')

const { register } = require('../controller/user')

router.get('/', (req, res) => {
    // 文章列表、訪問登入/註冊頁
    return res.render('index', {
        alert_msg: req.flash('alert_msg'),
        login: req.isAuthenticated(),
        blog: []
    })
})

router.post('/register', async (req, res) => {
    // 註冊操作
    const { email, password } = req.body
    let user = await register(email, password)
    if(!user) return req.flash('alert_msg', '此帳號已被註冊，請換其他帳號')
    req.flash('alert_msg', '註冊成功，請嘗試登入')
    // 註冊成功，導向 /，並 alert 嘗試登入
    res.redirect('/')
})

router.post('/user', 
    passport.authenticate('local', {
        failureRedirect: '/',
        failureFlash: true,
        failWithError: true
    }),
    (req, res) => {
    // 登入操作
        return res.redirect('/user/blog')
    }
)

router.get('/blog/:id', (req, res) => {
    // 顯示指定文章頁

    //Story.findById()
})

router.use((err, req, res, next) => {
    // 錯誤處理
    console.log('This is vister, Err => ', err)
})

module.exports = router