let router = require('express').Router()


const { USER_MODEL } = require('../model/user')
const { BLOG_MODEL }  = require('../model/blog')
const { SuccessModel } = require('../model/resModel')
router.get('/', (req, res) => {
    // 文章列表、訪問登入/註冊頁
    res.render('index', {
        //  是否登入
            //  true    會員名稱
            //  false   登入、註冊表
        //  文章列表
    })
})

router.post('/register', async (req, res) => {
    // 註冊操作
    const { email, password } = req.body
    const new_user = new USER_MODEL({ email, password })
    await new_user.save()
    const user = await USER_MODEL.findOne({email})
    // 註冊成功，導向 /，並 alert 嘗試登入
    res.redirect('/')
})

router.post('/user', (req, res) => {
    // 登入操作
})

router.get('/blog/:id', (req, res) => {
    // 顯示指定文章頁

    //Story.findById()
})

router.use((err, req, res, next) => {
    // 錯誤處理
})

module.exports = router