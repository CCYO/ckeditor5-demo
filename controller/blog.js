const { BLOG_MODEL } = require('../model/blog')

const saveBlog = async (email, title, html) => {
    const blogs = await BLOG_MODEL.find({title})
    if(blogs.length) return null
    let blog = new BLOG_MODEL({ email, title, html })
    await blog.save()
    blog = await BLOG_MODEL.find({title})
    return blog[0]
}

module.exports = { saveBlog }