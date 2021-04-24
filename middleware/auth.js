const jwt = require('jsonwebtoken')
const config = require('config')

const auth = (req , res, next)=>{
    const token = req.header('x-auth-token')
    if(!token) return res.status(400).send('Token not provided')

    try{
        const decode = jwt.verify(token, config.get('key'))
        req.user = decode
        next()
    }
    catch(ex){
        res.status(400).send('Invalid token.')
    }
}

module.exports = auth