const User = require('../routes/user')
const Post = require('../routes/post')
const Auth = require('../routes/auth')

module.exports = (app)=>{
    app.use('/user', User)
    app.use('/post', Post)
    app.use('/auth', Auth)
}