module.exports = (req, res, next) => {
    if(req.isAuthenticated()){
        return next()
    }
    req.flash('alert_msg', '請重新登入')
    return res.redirect('/')
}