const { BLOG_MODEL } = require('../model/blog')

const saveBlog = async (email, title, html) => {
    const check = await BLOG_MODEL.find({title})
    if(check.length) return null
    let blog = new BLOG_MODEL({ email, title, html })
    return await blog.save()
}

module.exports = { saveBlog }