let router = require('express').Router()

const { v4: uuidv4 } = require('uuid')

const admin = require('../config/firebase-admin')

const passport = require('../middleware/passport')
const isAuthenticated = require('../middleware/isAuthenticated')

const {USER_MODEL} = require('../model/user')
const {BLOG_MODEL} = require('../model/blog')

const { saveBlog } = require('../controller/blog')
const { uploadImg } = require('../controller/storage')

router.use( isAuthenticated )


router.get('/edit', async(req, res) => {
    return res.render('edit')
})

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

router.post('/blog', async (req, res) => {
    // 新增文章
    console.log('POST')
    let { title, imgs, content, uid } = req.body
    //  將 imgs 存入 firebase
    //  @urls: [url, url, ...]
    let urls = await uploadImg(title, imgs)
    let reg = new RegExp(uid)
    for(url of urls){
        content = content.replace(reg, url)
    }
    const { email } = req.user
    let blog = new BLOG_MODEL({
        email,
        title,
        content
    })
    await blog.save()
    blog = await BLOG_MODEL.findOne({email, title})
    console.log('blog id ==> ', blog.id)
    console.log('blog _id ==> ', blog._id)
    return res.json({href: `/blog/${blog._id}`})
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